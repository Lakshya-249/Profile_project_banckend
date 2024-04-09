const User = require("./Database.js"); // Assuming user schema/model is defined in Database.js

const registerUser = async (req, res) => {
  const { name, username, email, password, location, interests, image } =
    req.body;

  // Check if all required fields exist
  if (
    !name ||
    !username ||
    !email ||
    !password ||
    !location ||
    !interests ||
    !image
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  try {
    const newUser = new User({
      name,
      username,
      email,
      password,
      location,
      interests,
      image,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerUser;
