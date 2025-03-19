import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addToCart, getCart, removeFromCart, clearCart, decreaseQty } from "../controllers/cart.js";

const cartRouter = express.Router();

/**
 * @route   POST /cart/add
 * @desc    Add an item to the cart
 * @access  Private (User must be authenticated)
 */
cartRouter.post("/add", isAuthenticated, addToCart);

/**
 * @route   GET /cart/
 * @desc    Retrieve the user's cart
 * @access  Private (User must be authenticated)
 */
cartRouter.get("/", isAuthenticated, getCart);

/**
 * @route   POST /cart/remove/:productId
 * @desc    Remove a specific item from the cart by productId
 * @access  Private (User must be authenticated)
 */
cartRouter.post("/remove/:productId", isAuthenticated, removeFromCart);

/**
 * @route   DELETE /cart/clear
 * @desc    Clear all items from the cart
 * @access  Private (User must be authenticated)
 */
cartRouter.delete("/clear", isAuthenticated, clearCart);

/**
 * @route   POST /cart/decreaseQty
 * @desc    Decrease the quantity of an item in the cart
 * @access  Private (User must be authenticated)
 */
cartRouter.post("/decreaseQty", isAuthenticated, decreaseQty);

export { cartRouter };
