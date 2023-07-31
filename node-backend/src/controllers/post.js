const Post = require("../models/Post");

const that = {};

that.save = async (payload) => {
  try {
    const newPost = new Post(payload);
    const post = await newPost.save();

    return post;
  } catch (error) {
    throw error;
  }
};

that.getById = async (_id) => {
  try {
    const post = await Post.findById(_id);

    return post;
  } catch (error) {
    throw error;
  }
};

that.getAllPosts = async () => {
  try {
    const posts = await Post.find({});

    return posts;
  } catch (error) {
    throw error;
  }
};

module.exports = that;
