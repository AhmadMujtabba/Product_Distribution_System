import "reflect-metadata";
import * as express from "express";
import { datasource } from "./config/data-source";
import errorHandler from "./middleware/errorHandler";
import { userRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";
import { retailerRouter } from "./routes/retailer.routes";
import { productRouter } from "./routes/product.routes";
import { orderRouter } from "./routes/order.routes";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
//All routes will be inside this
app.use("/v1/", userRouter);
app.use("/v1/", authRouter);
app.use("/v1/", retailerRouter);
app.use("/v1/", productRouter);
app.use("/v1/", orderRouter);
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
