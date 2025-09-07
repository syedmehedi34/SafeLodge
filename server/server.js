// npm i express dotenv cors mongoose cloudinary multer svix, | nodemon
// model ->
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";

connectDB();
connectCloudinary();

const app = express();
app.use(cors()); // enable cors-origin here

// middleware
app.use(express.json());
app.use(clerkMiddleware());

// API to listen clerk webhook
app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => res.send("api is working"));
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
