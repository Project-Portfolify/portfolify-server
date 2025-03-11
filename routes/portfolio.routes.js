const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Portfolio = require("../models/Portfolio.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const slugify = require("slugify");
// POST /portfolios
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
    published,
    imageUrl,
  } = req.body;

  // Debugging: Verifica que los datos están llegando correctamente
  console.log("Request body:", req.body);

  // Verificar si los datos esenciales están presentes
  if (!slug || !name || !template) {
    return res.status(400).json({ error: "Required fields are missing" });
  }
  const slug = slugify(`${name}-${Date.now()}-${template}`, { lower: true });
  // Crear el nuevo portfolio
  const newPortfolio = {
    userId: req.payload._id, // Usamos el userId del token decodificado
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
  };

  Portfolio.create(newPortfolio)
    .then((createdPortfolio) => {
      res.status(201).json({ data: createdPortfolio });
    })
    .catch((err) => {
      console.log("Error creating portfolio:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// GET /portfolios/:slug
router.get("/portfolios/:slug", (req, res, next) => {
  const { slug } = req.params;

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

// GET /portfolios
router.get("/portfolios", (req, res, next) => {
  Portfolio.find({ published: true })
    .then((allPortfoliosFromDb) => {
      console.log("Portfolios Published:", allPortfoliosFromDb);
      res.status(200).json(allPortfoliosFromDb);
    })
    .catch((err) => {
      console.error("Error fetching portfolios:", err);
      res.status(500).json({ error: "Internal Server Error" });
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
    return res.status(400).json({ message: "Specified ID is not valid" });
  }

  Portfolio.findByIdAndUpdate(portfolioId, req.body, { new: true })
    .then((updatedPortfolio) => {
      res.status(201).json(updatedPortfolio);
    })
    .catch((err) => {
      console.error("Error updating portfolio:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
//DELETE

router.delete("/portfolios/:portfolioId", (req, res, next) => {
  const { portfolioId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(portfolioId)) {
    return res.status(400).json({ message: "Specified id is not valid" });
  }

  Portfolio.findByIdAndDelete(portfolioId)
    .then(() => {
      res.json({
        message: `Portfolio with ID ${portfolioId} was removed successfully.`,
      });
    })
    .catch((err) => {
      console.log("Error deleting the portfolio:", err);
      res.status(500).json({ message: "Error while deleting the portfolio" });
    });
});

module.exports = router;
