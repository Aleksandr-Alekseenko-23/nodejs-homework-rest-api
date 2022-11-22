const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    app.listen(PORT);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();
