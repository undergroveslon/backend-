const express = require("express");
const { model } = require("mongoose");
const mongoose = require("mongoose");
const Producer = require("../models/producer");

const router = express.Router();

router.post("/addProducer", (req, res) => {
  const producer = new Producer({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    rating: req.body.rating,
    profileUrl: req.body.profileUrl,
    activeSince: req.body.activeSince,
    averageDeliveryTime: req.body.averageDeliveryTime,
    genre: req.body.genre,
    package: req.body.package,
  });
  producer
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Producer added Sucesfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
});

router.get("/getProducers", (req, res) => {
  Producer.find()
    .then((producer) => {
      res.json({ producer });
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/deleteProducers", (req, res) => {
  console.log(req.body);
  console.log(req.body.id);
  console.log("Marasini muji");

  Producer.findOne({ id: req.body.id })
    .then((producer) => {
      if (producer) {
        Producer.deleteOne({ id: req.body.id })
          .then(() => {
            res.json({
              message: "Producer deleted successfully",
            });
          })
          .catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
          });
      } else {
        res.status(404).json({ error: "Producer not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
