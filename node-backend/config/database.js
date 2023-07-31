let mongoose = require("mongoose");
let dotenv = require("dotenv");
const envPath = process.env.NODE_ENV_PATH;

const dbConnect = async () => {
  try {
    if (envPath) {
      console.log(`CONFIG PATH  -->  ${envPath}`);
      dotenv.config(envPath);
    } else {
      dotenv.config();
    }

    const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
    const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI);

    console.log(`Mongo Connection  -->  SUCCESS`);
  } catch (err) {
    throw err;
  }
};

module.exports = dbConnect;
