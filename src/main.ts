import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import sequelize from "./database/models/index";
import { errorMiddleware } from "./middlewares/error";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(routes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Database connected.");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
