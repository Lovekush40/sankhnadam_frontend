import { useParams } from "react-router-dom";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // packageId
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handlePayment = async () => {
  try {
    setLoading(true);

    const res = await fetch(`${API_BASE}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ packageId: id }),
    });

    const data = await res.json();
    const order = data.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Sankhnadam Tours",
      description: "Advance Booking",
      order_id: order.id,

      handler: async function (response) {
        const verifyRes = await fetch(`${API_BASE}/verify-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response),
        });

        const result = await verifyRes.json();

        if (result.success) {
          window.location.href = "/success"; // ✅ redirect
        } else {
          alert("Payment verification failed ❌");
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
    alert("Something went wrong");
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