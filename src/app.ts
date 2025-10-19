import "reflect-metadata";
import * as express from "express";
import { datasource } from "./config/data-source";
import errorHandler from "./middleware/errorHandler";
import { userRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";
import { retailerRouter } from "./routes/retailer.routes";

const app = express();
const port = process.env.PORT;

app.use(express.json());
//All routes will be inside this
app.use("/v1/", userRouter);
app.use("/v1/", authRouter);
app.use("/v1/", retailerRouter);
//-----------------------------

app.use(errorHandler);

datasource
  .initialize()
  .then(() => {
    console.log("Datasource has been initialized!"),
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
  })
  .catch((err) => {
    console.log("Database connection failed : ", err);
  });
