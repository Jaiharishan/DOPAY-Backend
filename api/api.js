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
const getUserOrganizationsRouter = require("./routers/getUserOrganizations");
const getOrgListRouter = require("./routers/getOrgList");
const getOrgPaymentsRouter = require("./routers/getOrgPayments");
const getPaymentListRouter = require("./routers/getPaymentList");
const getOrgUsersRouter = require("./routers/getOrgUsers");
const getSearchOrganizationsRouter = require("./routers/getSearchOrganizations");

//use routes
router.use("/file", imageRouter);
router.use("/organization", organizationRouter);
router.use("/self", verifyJWT, userRouter);
router.use("/self", getUserOrganizationsRouter);
router.use("/user", getUserRouter);
router.use("/payment", paymentRouter);
router.use("/organization/addUser", addUserRouter);
router.use("/organization/removeUser", removeUserRouter);
router.use("/organization/promoteUser", promoteUserRouter);
router.use("/transaction", createTransaction);
router.use("/transaction", getUserTransactionRouter);
router.use("/organization/transactions/", getOrgTransactionRouter);
router.use("/organization/transactions/pending", getOrgPendingPaymentsRouter);
router.use("/organization", getOrgListRouter);
router.use("/organization", getOrgPaymentsRouter);
router.use("/organization", getOrgUsersRouter);
router.use("/payment", getPaymentListRouter);
router.use("/organization", getSearchOrganizationsRouter);

module.exports = router;
