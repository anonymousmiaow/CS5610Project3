import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";

import session from "express-session";

import indexRouter from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend/build")));

app.use(
  session({
    secret: "blog",
    resave: false,
    saveUninitialized: false,
    cookie: {},
  })
);

app.use("/", indexRouter);

if (process.env.NODE_ENV == "production") {
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend/build/index.html"));
  });
}

export default app;
