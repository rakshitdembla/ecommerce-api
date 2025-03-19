import { productsModel } from "../models/Products.js";
import mongoose from "mongoose";

/**
 * @route   GET /products
 * @desc    Get all products
 * @access  Public
 */
export const allProducts = async (req, res) => {
    try {
        const allProducts = await productsModel.find();
        return res.status(200).json({
            success: true,
            allProducts
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred!"
        });
    }
};

/**
 * @route   POST /products
 * @desc    Add a new product
 * @access  Public
 */
export const addProducts = async (req, res) => {
    const { name, description, price, image, category } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
        return res.status(400).json({
            success: false,
            message: "Please provide valid product details!"
        });
    }

    try {
        const ifExists = await productsModel.findOne({ name });

        if (ifExists) {
            return res.status(409).json({ // Conflict status code for duplicate entry
                success: false,
                message: "Product already exists!"
            });
        }

        const product = await productsModel.create(req.body);
        return res.status(201).json({ // 201 Created for successful resource creation
            success: true,
            message: "Product added successfully!",
            product
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred!"
        });
    }
};

/**
 * @route   DELETE /products/:id
 * @desc    Delete a product by ID
 * @access  Public
 */
export const deleteProducts = async (req, res) => {
    const { id } = req.params;

    try {
        const ifExists = await productsModel.findById(id);

        if (!ifExists) {
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }

        await productsModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully!"
        });

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID provided!"
        });
    }
};

/**
 * @route   PATCH /products/:id
 * @desc    Update product details
 * @access  Public
 */
export const updateProducts = async (req, res) => {
    const { id } = req.params;

    try {
        const ifExists = await productsModel.findById(id);
        
        if (!ifExists) {
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }

        const product = await productsModel.findByIdAndUpdate(id, req.body, { new: true });

        return res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            product
        });

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID provided!"
        });
    }
};
