const { Schema, model } = require("mongoose");

const user = Schema(
  {
    name: {
      type: "string",
      require: true,
    },
    surname: {
      type: "string",
    },
    email: {
      type: "string",
    },
    age: {
      type: "number",
      min: [18, `age {VALUE} shoud be more than 18`],

      max: [60, "age shoud be less than 60"],
    },
    contact: {
      type: "number",
    },
    state: {
      type: "string",
    },
    city: {
      type: "string",
    },
  },
  {
    toJSON: { virtuals: true },
  }
  //
);
// user.index({ name: 1, surname: 1 }, { unique: true });
user.index({ name: 1 });
// // find by
user.static("findByName", function findByName(name: string) {
  return User.find({ name: name });
});
// console.log("userrrr", user);
user.query.byName = function (name: string) {
  return this.where({ name: name });
};

// // sort by conditionally
// user.query("byName", (name: string) => {
//   return User.where({ name: name });
// });

const User = model("User", user);
export { User };
