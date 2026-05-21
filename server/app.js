import express from "express";
import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";
import userRouter from "./src/routes/user.route.js";
import adminRouter from "./src/routes/admin.route.js";

const app = express();

app.use(express.json());
app.use(cors());
// app.use(helmet());
// app.use(morgan("dev"));

app.use("/", userRouter);
app.use("/admin", adminRouter);

export default app;
