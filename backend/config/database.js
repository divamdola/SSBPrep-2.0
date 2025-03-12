const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect('mongodb+srv://divyanshuamdola01:Dippudon123@ssbprep-database.i19cx.mongodb.net/') // No need for extra options
    .then(() => console.log("MongoDB Database Connected"))
    .catch((err) => console.error("MongoDB Connection Failed:", err.message));
};

module.exports = connectDatabase;
