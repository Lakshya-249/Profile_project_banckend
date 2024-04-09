const User = require("./Database"); // Assuming user schema/model is defined in userModel.js

const checkExistingUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
    } else {
      return res
        .status(200)
        .json({ message: "Username and email are available" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = checkExistingUser;
