import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { AppDataSource } from "./data-source";
import { router as routes } from "./routes";
import cors from "cors";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized! 🫡");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("Server started on port 3333 🚀");
});
