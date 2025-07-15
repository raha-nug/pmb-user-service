import express from "express";
import cors from "cors";

import userRoutes from "./src/interfaces/routes/userRoute.js";
import userAuth from "./src/interfaces/routes/authRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/auth", userAuth);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
