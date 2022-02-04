const router = require("express").Router();

const { verifyJWT } = require("../middleware/jwt");
// import routes
const imageRouter = require("./routers/image");
const organizationRouter = require("./routers/organization");
const userRouter = require("./routers/user");
const getUserRouter = require("./routers/getUser");
const paymentRouter = require("./routers/payment");
const addUserRouter = require("./routers/addUser");
const removeUserRouter = require("./routers/removeUser");
const promoteUserRouter = require("./routers/promoteUser");
const createTransaction = require("./routers/createTransaction");
const getUserTransactionRouter = require("./routers/getUserTransaction");
const getOrgTransactionRouter = require("./routers/getOrgTransaction");
const getOrgPendingPaymentsRouter = require("./routers/getPendingPayments");

//use routes
router.use("/file", imageRouter);
router.use("/organization", organizationRouter);
router.use("/self", verifyJWT, userRouter);
router.use("/user", getUserRouter);
router.use("/payment", paymentRouter);
router.use("/organization/addUser", addUserRouter);
router.use("/organization/removeUser", removeUserRouter);
router.use("/organization/promoteUser", promoteUserRouter);
router.use("/transaction", createTransaction);
router.use("/transaction", getUserTransactionRouter);
router.use("/organization/transactions/", getOrgTransactionRouter);
router.use("/organization/transactions/pending", getOrgPendingPaymentsRouter);
module.exports = router;
