import express from "express";
import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";
import cookieParser from "cookie-parser";

// routes register
import userRouter from "./src/routes/user.route.js";
import adminRouter from "./src/routes/admin.route.js";
import bookRouter from "./src/routes/book.route.js";
import categoryRoute from "./src/routes/categories.route.js";
import ordersRoute from "./src/routes/orders.route.js";
import cartRoute from "./src/routes/cart.router.js";

import mongoDBConnect from "./src/config/db.config.js";
const app = express();
const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
  cors({
    origin: frontendURL,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
// app.use(helmet());
// app.use(morgan("dev"));
mongoDBConnect();
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/books", bookRouter);
app.use("/categories", categoryRoute);
app.use("/orders", ordersRoute);
app.use("/cart", cartRoute);

export default app;
