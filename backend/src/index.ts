import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import Stripe from 'stripe';

// Routes
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelRoutes from './routes/my-hotels';
import hotelRoutes from './routes/hotels';
import bookingRoutes from "./routes/my-bookings";

// Initialize Stripe with API key
const stripe = new Stripe(process.env.STRIPE_API_KEY as string, );

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Initialize Express App
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Stripe Payment Intent Route
app.post("/create-payment-intent", async (req: Request, res: Response) => {
    try {
        const { amount } = req.body;

        // Create a PaymentIntent with the specified amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // amount in the smallest currency unit (e.g., cents for USD)
            currency: "usd",
            payment_method_types: ['card'],
        });

        res.send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);

// Catch-all for SPA (Single Page Application)
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
