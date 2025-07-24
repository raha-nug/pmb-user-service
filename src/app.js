import express from "express";
import cors from "cors";

import userRoutes from "./interfaces/routes/userRoute.js";
import userAuth from "./interfaces/routes/authRoute.js";

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/auth", userAuth);

export default app;
