// importing env variables
require("dotenv").config({ path: "./env/.env" });

// importing other necessary libraries
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/db");

// import api and auth routes
const apiRouter = require("./api/api");
const authRouter = require("./api/auth");

// using middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// using the imported routes
app.use("/api", apiRouter);
app.use("/auth", authRouter);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
