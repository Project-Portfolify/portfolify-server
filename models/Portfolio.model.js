const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const portfolioSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gitHub: String,
    linkedIn: String,
    country: String,
    title: { type: String, required: true },
    about: { type: String, required: true },
    experience: [
      {
        role: { type: String },
        company: { type: String },
        duration: {
          from: { type: Number, required: true }, // Year from
          to: { type: Number, required: true }, // Year to
        },
        description: { type: String },
      },
    ],
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        link: { type: String },
      },
    ],
    imageUrl: { type: String },
    skills: [String],
    template: String,
    slug: { type: String, unique: true },
  },
  { timestamps: true } // to register when the portfolio was created or edited, we can leave it or delete it
);

const Portfolio = model("Portfolio", portfolioSchema);

module.exports = Portfolio;
