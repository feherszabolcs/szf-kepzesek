const express = require("express");
require("dotenv").config();
const trainings = require("./routes/trainings");

const app = express();
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

app.use("/api/trainings", trainings);
