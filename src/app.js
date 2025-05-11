import express from "express";
import cookieParser from "cookie-parser";

import database from "./config/database.js";
import "./models/index.js";

// rutas
import {
  authRoute,
  homeRoute,
  usersRoute,
  categoryRoute,
  supplierRoute,
  productRoute,
  reportRoute,
} from "./routes/index.js";

// Crear Aplicación
const app = express();
app.use(cookieParser());

// Middleware para parsear application/json
app.use(express.json());

Object.values(database).forEach((model) => {
  if (model.associate) model.associate(database);
});

// Conectar Base de Datos
database
  .sync({ alter: true })
  .then(() => {
    console.log("Base de datos sincronizada correctamente.");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });

// database.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Db");
//   // initialDatabase();
// });

// Routing
app.use("/", homeRoute);
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/categories", categoryRoute);
app.use("/suppliers", supplierRoute);
app.use("/products", productRoute);
app.use("/reporte", reportRoute);

export default app;
