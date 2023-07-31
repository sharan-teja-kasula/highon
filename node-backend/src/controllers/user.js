const axios = require("axios");

const User = require("../models/User");

const that = {};

that.getByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    throw err;
  }
};

that.checkEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user ? true : false;
  } catch (err) {
    throw err;
  }
};

that.saveUser = async (userInfo) => {
  try {
    const newUser = new User(userInfo);
    const user = await newUser.save();
    return user;
  } catch (err) {
    throw err;
  }
};

that.getUserDetailsByGoogleToken = async (accessToken) => {
  try {
    const url = "https://www.googleapis.com/userinfo/v2/me";
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const user = await axios.get(url, options);

    return user?.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = that;
