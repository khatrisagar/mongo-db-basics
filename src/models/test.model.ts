const { Schema, model } = require("mongoose");

const test = Schema(
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
    toObject: { virtuals: true },
  }
);
// it will creates an index on name in the ascentndiop order of soting
// test.index({ name: 1 });

test.statics.findByName = function (name: string): any {
  return this.find({ name: name });
};
test.query.byName = function (name: string): any {
  return this.find({ name: name });
};
test.virtual("fullName").get(function (this: any) {
  return this.name + " " + this.surname;
});
// console.log(test);
const Test = model("Test", test);
export { Test };
