import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth_routes.js";
import { productsRouter } from "./routes/product_routes.js";
import { cartRouter } from "./routes/cart_routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

/**
 * @desc    Start the Express server
 */
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

/**
 * @desc    Connect to MongoDB database
 */
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI, {
            dbName: "ecommerce_api"
        });
        console.log("Mongoose connected successfully!");
    } catch (e) {
        console.log("Error in mongoose connection!");
    }
};

dbConnection();

/**
 * @desc    Middleware to parse incoming request bodies
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * @desc    Define API routes
 */
app.use("/api/auth", authRouter);      // Authentication routes
app.use("/api/products", productsRouter);  // Product-related routes
app.use("/api/cart", cartRouter);      // Cart-related routes
