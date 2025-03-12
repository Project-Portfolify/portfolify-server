const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//GET /api/health

router.get("/health", (req, res, next) => {
  mongoose.connection.db
    .admin()
    .ping()
    .then(() => {
      res
        .status(200)
        .json({ status: "ok", timestamp: new Date().toISOString() });
    })
    .catch((err) => {
      console.error("Mongodb ping failed", err);
      res
        .status(500)
        .json({ status: "error", message: "Failed to connect to MongoDb" });
    });
});

module.exports = router;
