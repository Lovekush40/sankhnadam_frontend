import { useParams } from "react-router-dom";
import { useState } from "react";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // packageId
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

 const handlePayment = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    const res = await fetch(`${API_BASE}/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ packageId: id }),
    });

    if (!res.ok) {
      throw new Error("Failed to create order");
    }

    const data = await res.json();
    const order = data.data || data;

    if (!order?.id) {
      throw new Error("Invalid order response");
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Sankhnadam Tours",
      description: "Advance Booking",
      order_id: order.id,
handler: async function (response) {
  console.log("RAZORPAY RESPONSE:", response);

  const verifyRes = await fetch(`${API_BASE}/payment/verify-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
    }),
  });

  const result = await verifyRes.json();

  if (verifyRes.status === 200) {
    window.location.href = "/#/success";
  } else {
    alert(result.message || "Payment verification failed ❌");
  }
},

      theme: {
        color: "#f97316",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      alert(response.error.description);
    });

    rzp.open();

  } catch (err) {
    console.error(err);
    alert(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-orange-600 text-white px-6 py-3 rounded-lg"
        >
        {loading ? "Processing..." : "Pay Advance"}
     </button>
    </div>
  );
};

export default Payment;