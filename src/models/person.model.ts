import { Schema, model } from "mongoose";

const person = new Schema({
  name: {
    type: "string",
    required: true,
  },
  age: {
    type: "number",
  },
  stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

export const Person = model("Person", person);
