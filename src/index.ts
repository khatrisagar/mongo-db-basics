import express, { Application } from "express";
const { connect } = require("mongoose");
const app: Application = express();
const PORT = 9999;
const { faker } = require("@faker-js/faker");

let db: any;
app.use(express.json());
const connectDB = async () => {
  try {
    const db = await connect("mongodb://localhost:27017/practice", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (e) {
    console.log("database conection failed", e);
  }
};
connectDB();

import { User } from "./models/users.model";
import { Test } from "./models/test.model";
import { Person } from "./models/person.model";
import { Story } from "./models/story.model";

// add user

// app.post("/", async (req, res) => {
//   let resultt = await User.insertMany(req.body);
//   res.json(resultt);
// });

// get all users
// app.get("/all-users", async (req, res) => {
//   let users = await User.find();
//   res.json(users);
// });
// add multiple users

app.post("/all-users", async (req, res) => {
  //   // await User.create({
  //   // name: faker
  //   // })
  try {
    // for (let i = 0; i < 100; i++) {
    await Test.create({
      name: faker.internet.userName(),
      surname: faker.internet.userName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 1, max: 100 }),
      contact: faker.number.int(),
      state: faker.internet.userName(),
      city: faker.internet.userName(),
    });
    // }
    res.json("user");
  } catch (e) {
    res.json((e as Error).message);
  }
});

// sort by where condtion
app.get("/where", async (req, res) => {
  let users = await User.find({ name: "user1" });
  res.json(users);
});
//  sort by name -1 and 1 according decending and ascending
app.get("/sort", async (req, res) => {
  let users = await User.find().sort({ name: 1 });
  res.json(users);
});
// find and update
app.patch("/find-update", async (req, res) => {
  let users = await User.findOneAndUpdate(
    { name: "aaaasasass" },
    { $set: { surname: "sas" } },
    // for returning updated value
    { new: true }
  );
  res.json(users);
});

// get a state of the query execution
app.get("/stats", async (req, res) => {
  // User.collection.dropIndex("name_1");
  const a = await User.collection.getIndexes();
  console.log(a);
  let users = await User.find({ name: "user1" }).explain("executionStats");
  res.json(users);
});

// update  after indexing

app.patch("/update", async (req, res) => {
  let users = await User.findOneAndUpdate(
    { surname: "su4" },
    { $set: { email: "name4@gmail.com" } },
    // for returning updated value
    { new: true }
  );
  res.json(users);
});

// aggregate
app.get("/aggregate", async (req, res) => {
  let users = await Test.aggregate([
    //   { $group: { _id: "$age", names: { $push: "$name" } } },
    // { $group: { _id: "$age", Users: { $push: "$$ROOT" } } },
    { $group: { _id: "$age", count: { $sum: 1 }, Users: { $push: "$$ROOT" } } },

    { $sort: { count: 1 } },
    // it creates a multiple copy for array result and seperate it by one value of array
    // { $unwind: "$items" },
    //
  ]);
  res.json(users);
});
// find by name
app.get("/find-name", async (req, res) => {
  let users = await User.findByName("Kirk_Walter");
  res.json(users);
});
// by name
app.get("/by-name", async (req, res) => {
  let users = await User.find().byName("Kirk_Walter");
  console.log("fullName", users);
  res.json(users);
});
app.get("/virtual", async (req, res) => {
  let users = await Test.find().limit(5);
  console.log("fullName", typeof users);
  res.json(users);
});

// populate

app.get("/person", async (req, res) => {
  const person = await Person.find().populate({
    path: "stories",
    // perDocumentLimit: 2,
    select: "-author",
  });
  res.json(person);
});
app.get("/story", async (req, res) => {
  const story = await Story.find().populate({
    path: "author",
    select: " -_id -stories -__v",
  });
  res.json(story);
});
app.post("/story", async (req, res) => {
  // const person = await Person.create({
  //   name: "dasdasds",
  //   age: 54,
  // });
  const story = await Story.create({
    title: "ytyrty",
    body: "ytyt",
    author: "64a54162a50c76755660b3be",
  });

  const person = await Person.updateOne(
    { _id: "64a54162a50c76755660b3be" },
    { $push: { stories: story._id } }
  );
  res.json({ person, story });
});
app.delete("/delete", async (req, res) => {
  const deleteStory = await Story.deleteOne({ title: "sasa" });

  res.json(deleteStory);
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
