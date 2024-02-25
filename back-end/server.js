import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDb from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import taskRoute from "./routes/taskRoute.js";

const app = express();

dotenv.config();

// database
connectDb();
// middleware
app.use(morgan("dev"));
app.use(express.json());

// routes

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/task", taskRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
