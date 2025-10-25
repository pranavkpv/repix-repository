import express from 'express';
import AuthRoute from './Routes/authRoute.js';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { ErrorHandler } from './Middlewares/error.js';
import imageRoute from './Routes/imageRoute.js';
dotenv.config();
const app = express();
connectDB();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(dirname, "../uploads")));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());
const PORT = process.env.PORT || 7000;
app.use(AuthRoute);
app.use('/image', imageRoute);
app.use(ErrorHandler.handleError);
app.use(morgan("dev"));
morgan.token("body", (req) => JSON.stringify(req.body) || "No Body");
app.use(morgan("Request Body: :body"));
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
