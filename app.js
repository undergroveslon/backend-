const express = require("express");
const mongose = require("mongoose");

const app = express();
const userRoute = require("./api/routes/user");
const vehicalRoute = require("./api/routes/vehical");
mongose.connect(
  "mongodb+srv://np03cs4s220363:S123456@cluster0.mrfhznh.mongodb.net/Shop?retryWrites=true&w=majority"
);

mongose.connection.on("error", (err) => {
  console.log("Connection failed");
});

mongose.connection.on("connected", (connected) => {
  console.log("Connection established");
});

app.use("/user", userRoute);
app.use("/vehical", vehicalRoute);
app.use((req, res, next) => {
  res.status(404).json({
    error: "404 page not found",
  });
});

app.use((req, res, next) => {
  res.status(200).json({
    message: "App is running",
  });
});

module.exports = app;