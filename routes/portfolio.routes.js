const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Portfolio = require("../models/Portfolio.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//POST /portfolios

router.post("/portfolios", isAuthenticated, (req, res, next) => {
  const { userName, title, about, experience, projects, imageUrl, skills } =
    req.body;
  const newPortfolio = {
    userId: req.payload._id,
    userName,
    title,
    about,
    experience,
    projects,
    imageUrl,
    skills,
  };

  Portfolio.create(newPortfolio)
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((err) => {
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

router.delete("/portfolio", (req, res, next) => {
  const { portfolioId } = req.params();
  if (!mongoose.Types.ObjectId.isValid(portfolioId)) {
    res.status(400).json({ message: "Specified ID is not valid" });
  }

  Portfolio.findByIdAndRemove(portfolioId)
    .then(() => {
      res.status(200).json({ message: "Portfolio deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
});

module.exports = router;
