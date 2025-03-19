import express from "express";
import { allProducts, addProducts, deleteProducts, updateProducts } from "../controllers/products.js";

const productsRouter = express.Router();

/**
 * @route   GET /products
 * @desc    Get all products
 * @access  Public
 */
productsRouter.get("/", allProducts);

/**
 * @route   POST /products
 * @desc    Add a new product
 * @access  Public
 */
productsRouter.post("/", addProducts);

/**
 * @route   DELETE /products/:id
 * @desc    Delete a product by ID
 * @access  Public
 */
productsRouter.delete("/:id", deleteProducts);

/**
 * @route   PATCH /products/:id
 * @desc    Update product details
 * @access  Public
 */
productsRouter.patch("/:id", updateProducts);

export { productsRouter };
