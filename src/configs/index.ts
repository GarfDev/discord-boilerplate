import dotenv from "dotenv";

dotenv.config();

export const config = {
  ID: process.env.ID,
  TOKEN: process.env.TOKEN,
};
