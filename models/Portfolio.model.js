const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const portfolioSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        experience: [
            {
                role: { type: String, required: true },
                company: { type: String, required: true },
                duration: { type: String, required: true },
                description: { type: String }
            }
        ],
        projects: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
                link: { type: String }
            }
        ],
        imageUrl: { type: String },
        skills: [String],
    },
    { timestamps: true } // to register when the portfolio was created or edited, we can leave it or delete it
);

const portfolio = model("portfolio", portfolioSchema);

module.exports = portfolio;