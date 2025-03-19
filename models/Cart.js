import mongoose from "mongoose";

/**
 * Item Schema
 * Represents individual items in the cart
 */
const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productsModel",
        required: true
    }
});

/**
 * Cart Schema
 * Represents a user's cart containing multiple items
 */
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    items: [itemSchema]
});

// Export the Cart Model
export const cartModel = mongoose.model("carts", cartSchema);