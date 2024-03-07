import dotenv from "dotenv";

dotenv.config();
export const CONNECTION_STRING = process.env.CONNECTION_STRING;
export const PORT = process.env.PORT;
export const SECRET = process.env.SECRET;
