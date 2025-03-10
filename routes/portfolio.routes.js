const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Portfolio = require("../models/Portfolio.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//POST /portfolios

router.post("/portfolios", isAuthenticated, (req, res, next) => {
  const {
    name,
    gitHub,
    linkedIn,
    email,
    country,
    title,
    about,
    experience,
    projects,
    skills,
    template,
    slug,
  } = req.body;

  console.log("req.body:", req.payload);

  const newPortfolio = {
    userId: req.payload._id,
    name,
    gitHub,
    linkedIn,
    email,
    country,
    title,
    about,
    experience,
    projects,
    skills,
    template,
    slug,
  };

  Portfolio.create(newPortfolio)
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((err) => {
      console.log("error:", err);
      res.status(500).json({ Error: err });
    });
});

//GET /portfolios

router.get("/portfolios", (req, res, next) => {
  Portfolio.find()
    .then((allPortfoliosFromDb) => {
      res.status(200).json(allPortfoliosFromDb);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
});

//Get one Portfolio

router.get("/portfolios/:portfolioId", (req, res, next) => {
  const { portfolioId } = req.params();

  Portfolio.findById(portfolioId)
    .then((portfolioFromDb) => {
      res.status(200).json(portfolioFromDb);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
});

//PUT /portfolios/:portfolioId

router.put("/portfolios/:portfolioId", (req, res, next) => {
  const { portfolioId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(portfolioId)) {
    res.status(400).json({ message: "Specified ID is not valid" });
  }

  Portfolio.findByIdAndUpdate(portfolioId, req.body, { new: true })
    .then((updatedPortfolio) => {
      res.status(201).json(updatedPortfolio);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
});

//DELETE

router.delete("/portfolios/:portfolioId", (req, res, next) => {
  const { portfolioId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(portfolioId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Portfolio.findByIdAndDelete(portfolioId)
    .then(() =>
      res.json({
        message: `Project with ${portfolioId} is removed successfully.`,
      })
    )
    .catch((err) => {
      console.log("Error while deleting the project", err);
      res.status(500).json({ message: "Error while deleting the project" });
    });
});

module.exports = router;
