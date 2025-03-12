const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Portfolio = require("../models/Portfolio.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const slugify = require("slugify");

// POST /portfolios
router.post("/portfolios", isAuthenticated, (req, res) => {
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
    published,
    slug,
    imageUrl,
  } = req.body;

  console.log("Request body:", req.body);

  // Generate slug
  if (!name || !template) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  const newPortfolio = new Portfolio({
    userId: req.payload._id, // User from JWT
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
    published,
    imageUrl,
  });

  Portfolio.create(newPortfolio)
    .then((createdPortfolio) => {
      res.status(201).json({ data: createdPortfolio });
    })
    .catch((err) => {
      console.error("Error creating portfolio:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// GET /portfolios/:slug
router.get("/portfolios/:slug", (req, res) => {
  const { slug } = req.params;
  console.log(slug);

  Portfolio.findOne({ slug })
    .then((portfolio) => {
      if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
      }
      res.status(200).json(portfolio);
    })
    .catch((err) => {
      console.error("Error fetching portfolio:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// GET /portfolios (Published Only)
router.get("/portfolios", isAuthenticated, (req, res) => {
  Portfolio.find({ published: true, userId: req.payload._id })
    .then((allPortfolios) => {
      console.log("Portfolios Published:", allPortfolios);
      res.status(200).json(allPortfolios);
    })
    .catch((err) => {
      console.error("Error fetching portfolios:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// PUT /portfolios/:portfolioId

router.put("/portfolios/:slug", (req, res) => {
  const { slug } = req.params;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ message: "Invalid portfolio slug" });
  }

  Portfolio.findOneAndUpdate({ slug }, req.body, { new: true })
    .then((updatedPortfolio) => {
      if (!updatedPortfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      res.status(200).json(updatedPortfolio);
    })
    .catch((err) => {
      console.error("Error updating portfolio:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// DELETE /portfolios/:portfolioId
router.delete("/portfolios/:portfolioId", (req, res) => {
  const { portfolioId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(portfolioId)) {
    return res.status(400).json({ message: "Invalid Portfolio ID" });
  }

  Portfolio.findByIdAndDelete(portfolioId)
    .then((deletedPortfolio) => {
      if (!deletedPortfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      res.json({
        message: `Portfolio with ID ${portfolioId} was removed successfully.`,
      });
    })
    .catch((err) => {
      console.error("Error deleting portfolio:", err);
      res.status(500).json({ error: "Error while deleting the portfolio" });
    });
});

module.exports = router;
