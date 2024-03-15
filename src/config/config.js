import dotenv from "dotenv";

dotenv.config();
export const CONNECTION_STRING = process.env.CONNECTION_STRING;
export const PORT = process.env.PORT;
export const SECRET = process.env.SECRET;
export const ADMIN_KEY = process.env.ADMIN_KEY;
export const USER_KEY = process.env.USER_KEY;
