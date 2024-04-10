const User = require("./Database.js"); // Assuming user schema/model is defined in Database.js
const resend = require("./utils/resendEmail.js");

const changeUserEmailByUsername = async (req, res, next) => {
  const { username, newEmail } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's email
    user.email = newEmail;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Email updated successfully", user });
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: newEmail,
      subject: "Hello World",
      html: "<p>Congrats!!! <strong>Thank you for Joining Dribble</strong>!</p>",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = changeUserEmailByUsername;
