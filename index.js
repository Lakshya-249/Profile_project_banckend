const express = require("express");
const router = require("./router");
require("dotenv").config();
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
