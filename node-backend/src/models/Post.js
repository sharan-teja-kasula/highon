const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    peopleTags: {
      type: Array,
      required: true,
    },
  },
  { strict: false, timestamps: true },
  { collection: "post" }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
