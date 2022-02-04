const router = require("express").Router();

// import routes
const createUserRouter = require("./routers/createUser");

//use routes
router.use("/user", createUserRouter);

module.exports = router;
