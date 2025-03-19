import mongoose from 'mongoose';
import { cartModel } from '../models/Cart.js';

/**
 * @api {POST} /cart/add Add Item to Cart
 * @desc Adds an item to the user's cart or updates quantity if it already exists
 * @access Private
 */
export const addToCart = async (req, res) => {
    const { productId, title, description, price, qty } = req.body;
    const userId = req.authUser._id;

    if (!productId || !title || !price || !qty) {
        return res.status(400).json({
            success: false,
            message: "All fields are mandatory in the body!"
        });
    }
    
    try {
        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = new cartModel({ userId, items: [] });
        }
            const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].qty += qty;
                cart.items[itemIndex].price += price * qty;
            } else {
                cart.items.push({
                    productId: new mongoose.Types.ObjectId(productId),
                    title,
                    description,
                    price: price * qty,
                    qty
                });
            }
        
        
        await cart.save();
        return res.status(201).json({ 
            success: true,
            message: "Item added to cart successfully!",
            cart
        });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid product details!"
        });
    }
};

/**
 * @api {GET} /cart Get User's Cart
 * @desc Retrieves the user's cart
 * @access Private
 */
export const getCart = async (req, res) => {
    try {
        let cart = await cartModel.findOne({ userId: req.authUser._id });
        if (!cart) {
            cart = new cartModel({ userId: req.authUser._id, items: [] });
        }

        return res.status(200).json({
            success: true,
            cart
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred!"
        });
    }
};

/**
 * @api {DELETE} /cart/remove/:productId Remove Item from Cart
 * @desc Removes a specific item from the user's cart
 * @access Private
 */
export const removeFromCart = async (req, res) => {
    const userId = req.authUser._id;
    const productId = req.params.productId;

    try {
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            let cart = new cartModel({
                userId: userId,
                items: []
            });
        }

        const initialLength = cart.items.length;
        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
        await cart.save();

        if (initialLength === cart.items.length) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart!"
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Product removed from cart successfully!",
            cart
        });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Invalid Product Id"
        });
    }
};

/**
 * @api {DELETE} /cart/clear Clear Cart
 * @desc Clears all items from the user's cart
 * @access Private
 */
export const clearCart = async (req, res) => {
    const userId = req.authUser._id;

    try {
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = new cartModel({ userId, items: [] });
        }
        
        cart.items = [];
        await cart.save();
        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully!"
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred!"
        });
    }
};

/**
 * @api {POST} /cart/decreaseQty Decrease Item Quantity
 * @desc Decreases the quantity of an item in the cart
 * @access Private
 */
export const decreaseQty = async (req, res) => {
    const { productId, qty } = req.body;
    const userId = req.authUser._id;
    
    try {
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            let cart = new cartModel({
                userId: userId,
                items : []
            });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex > -1) {
            const initialTotal = cart.items[itemIndex].price;
            const initialQty = cart.items[itemIndex].qty;
            const productPrice = initialTotal / initialQty;

            cart.items[itemIndex].qty -= qty;
            cart.items[itemIndex].price -= productPrice * qty;
            await cart.save();

            return res.status(200).json({  
                success: true,
                message: "Quantity decreased successfully!"
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Item not found!"
            });
        }
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Invalid Product Id"
        });
    }
};
