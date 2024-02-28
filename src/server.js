import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config/config.js";
import roomsRoutes from "./routes/rooms.routes.js";
import userRoutes from "./routes/user.routes.js";
import "./db.js";

const app = express();

const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use("/rooms", roomsRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`La app está escuchando el puerto: ${PORT}`);
});
