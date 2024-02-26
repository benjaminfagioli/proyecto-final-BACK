import express from "express";
import morgan from "morgan";
import { PORT } from "./config/config.js";
import productsRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/rooms", productsRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`La app está escuchando el puerto: ${PORT}`);
});
