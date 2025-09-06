// npm i express dotenv cors mongoose cloudinary multer svix, | nodemon
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";

connectDB();
const app = express();
app.use(cors()); // enable cors-origin here

// middleware
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("api is working"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
