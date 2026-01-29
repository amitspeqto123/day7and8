import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { databaseConnection } from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet"

const app = express();
const port = 8080;

import productRoute from "./route/productRoute.js";
import categoryRoute from "./route/categoryRoute.js";
import authRoute from "./route/authRoute.js";
import orderRoute from "./route/orderRoute.js";

// third party Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173/, http://localhost:5174/",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  }),
);

databaseConnection();
// swagger
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// api ends poind
app.use("/products", productRoute);
app.use("/category", categoryRoute);
app.use("/auth", authRoute);
app.use("/order", orderRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
