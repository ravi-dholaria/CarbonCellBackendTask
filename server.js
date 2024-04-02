import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import dataRoute from "./routes/dataRoute.js";
import ethereumRoute from "./routes/ethereumRoute.js";
import connectDB from "./db.js";
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoute);
app.use("/api/ethereum", ethereumRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
