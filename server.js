import express from "express";
import { databaseConnection } from "./config/db.js";

const app =express();
const port = 8080;

import productRoute from "./route/productRoute.js"
import categoryRoute from "./route/categoryRoute.js"
import authRoute from "./route/authRoute.js"

// Middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

databaseConnection();

// api ends poind
app.use("/products", productRoute);
app.use("/category", categoryRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})