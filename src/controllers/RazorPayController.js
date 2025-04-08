
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");


// Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_d32mzcypTwltG7",
  key_secret: "1YJr64YQjSz8F09ADdcsIo2x",
});

// API to create an order
const create_order =async (req, res) => {
  const { amount, currency, receipt } = req.body;
  
  const options = {
    amount: amount * 100, // Razorpay expects the amount in paise
    currency: currency,
    receipt: receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order); // Returns the order details, including order_id
  } catch (error) {
    console.log(error)
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// API to verify the payment signature (optional for backend verification)
const verify_order = async (req, res) => {
  const crypto = require("crypto");

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const secret = "1YJr64YQjSz8F09ADdcsIo2x";

  const hash = crypto.createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");
  console.log(hash, razorpay_signature);
  if (hash === razorpay_signature) {
    res.json({ status: "success" });
  } else {
    res.status(400).json({ status: "failure" });
  }
};

module.exports = {
    create_order,
    verify_order,
}
