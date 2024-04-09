const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection
mongoose.connect(process.env.MG_DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  interests: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
