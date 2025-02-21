import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./database/dataSource";
import taskRoutes from "./routes/taskRoutes";
import "reflect-metadata";

const app = express();
app.use(bodyParser.json());
app.use("/api", taskRoutes);

AppDataSource.initialize().then(() => {
  console.log("Database connected");
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});

export default app;