import { Schema, model } from "mongoose";

const stroy = new Schema({
  title: {
    type: "string",
  },
  body: {
    type: "string",
  },
  author: { type: Schema.Types.ObjectId, ref: "Person" },
});

export const Story = model("Story", stroy);
