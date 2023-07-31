const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  { strict: false, timestamps: true },
  { collection: "user" }
);

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("user", userSchema);
module.exports = User;
