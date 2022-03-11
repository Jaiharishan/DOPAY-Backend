const Organization = require("../../db/models/Organization");
const Payment = require("../../db/models/Payment");
const { verifyJWT } = require("../../middleware/jwt");

const router = require("express").Router();

// /api/payment/org_id/create
router.post("/:id/create", verifyJWT, async (req, res) => {
  try {
    const org_id = req.params.id;

    const { name, description, amount, deadline } = req.body;

    if (!name || !description || !amount || !deadline) {
      return res.status(400).json({
        message: "Fill all the fields",
      });
    }

    if (await Payment.findOne({ name: name })) {
      return res.status(400).json({
        message: "Same payment already exists!",
      });
    }

    const newPayment = new Payment({
      name: name,
      description: description,
      organization: org_id,
      amount: amount,
      deadline: deadline,
    });

    await newPayment.save();

    const organization = await Organization.findById(org_id);

    if (!organization) {
      return res.status(400).json({
        message: "Organization not found!",
      });
    }

    // adding the payment to the organization as an element in the array

    await Organization.findByIdAndUpdate(org_id, {
      $addToSet: { payments: newPayment._id },
    });

    return res.status(200).json({
      message: "Payment created successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server error, Try again!!",
    });
  }
});

// /api/payment/:payment_id

router.get("/:id", async (req, res) => {
  try {
    const payment_id = req.params.id;

    const payment = await Payment.findById(payment_id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment details not found",
      });
    }

    return res.status(200).json({
      message: "Payment details fetched successfully",
      payment,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server error, Try again!!",
    });
  }
});

// /api/payment/edit/:payment_id

router.put("/edit/:id", verifyJWT, async (req, res) => {
  try {
    const { description, amount, deadline } = req.body;

    const payment_id = req.params.id;

    if (!description || !amount || !deadline) {
      return res.status(400).json({
        message: "Fill all the fields",
      });
    }

    const payment = await Payment.findById(payment_id);

    if (!payment)
      return res.status(404).json({ message: "Payment details not found" });

    await Payment.findByIdAndUpdate(payment_id, {
      description: description,
      amount: amount,
      deadline: deadline,
    });

    return res.status(200).json({
      message: "Payment details updated successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server error, Try again later!!",
    });
  }
});

// /api/payment/delete/:payment_id

router.delete("/delete/:id", verifyJWT, async (req, res) => {
  try {
    const payment_id = req.params.id;

    const payment = await Payment.findById(payment_id);

    if (!payment)
      return res.status(404).json({ message: "Payment details not found" });

    await Payment.findByIdAndDelete(payment_id);

    return res.status(200).json({
      message: "Payment details delete successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server error, Try again later!!",
    });
  }
});

module.exports = router;
