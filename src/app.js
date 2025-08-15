import express from "express";
import cors from "cors";

import userRoutes from "./interfaces/routes/userRoute.js";
import userAuth from "./interfaces/routes/authRoute.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/auth", userAuth);
app.get("/", (req, res) => {
  res.send("Selamat datang di User Service API");
});

export default app;
