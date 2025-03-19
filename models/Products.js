import mongoose from "mongoose";

// Define product schema
const productsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        image: { type: String },
        category: { type: String, required: true }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export product model
export const productsModel = mongoose.model("products", productsSchema);
