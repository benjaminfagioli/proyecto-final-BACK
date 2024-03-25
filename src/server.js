import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config/config.js";
import roomsRoutes from "./routes/rooms.routes.js";
import userRoutes from "./routes/user.routes.js";
import "./db.js";
import path from "path";
import { fileURLToPath } from "url";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));
