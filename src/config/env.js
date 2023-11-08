require("dotenv").config();

exports.ENV = {
  API_PORT: process.env.API_PORT,
  MONGO_URI: process.env.MONGO_URI,
  CUSTOM_TOKEN: process.env.CUSTOM_TOKEN,
};