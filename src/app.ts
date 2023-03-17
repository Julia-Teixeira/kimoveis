import "express-async-errors";
import express, { Application } from "express";

import { errorHandler } from "./errors";
import {
  categoriesRoutes,
  loginRoutes,
  realEstateRoutes,
  schedulesRoutes,
  usersRoutes,
} from "./routers";

const app: Application = express();

app.use(express.json());
app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/schedules", schedulesRoutes);
app.use(errorHandler);

export default app;
