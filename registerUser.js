const User = require("./Database.js"); // Assuming user schema/model is defined in Database.js
const { cloudinary } = require("./utils/cloudinary.js");
const resend = require("./utils/resendEmail.js");

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
  const result = await cloudinary.uploader.upload(image, {
    upload_preset: "dev_setup",
  });

  // console.log(result);

  try {
    const newUser = new User({
      name,
      username,
      email,
      password,
      location,
      interests,
      image: result.url,
    });

    await newUser.save();
    res.status(201).json(newUser);
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Hello World",
      html: "<p>Congrats!!! <strong>Thank you for Joining Dribble</strong>!</p>",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerUser;
