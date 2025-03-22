import mongoose from "mongoose";


const schema = new mongoose.Schema({

    companyName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    website: {
        type: String,
    },
    industry: {
        type: String, required: true,
        enum: ["Technology & IT",
            "Finance & Banking",
            "Healthcare & Pharmaceuticals",
            "Education & Training",
            "Manufacturing & Engineering",
            "Retail & E-commerce",
            "Marketing & Advertising",
            "Construction & Real Estate",
            "Logistics & Transportation",
            +
            "Hospitality & Tourism",
            "Government & Public Sector",
            "Legal & Consulting"]
    },
    location: { type: String, required: true },
    password: { type: String, required: true },


},
    { timestamps: true }
)

export const JobRecruiter = mongoose.model("JobRecruiter", schema);