import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ShieldCheck, CreditCard } from "lucide-react";
import axios from "axios";

const Payment = () => {
  const { id } = useParams(); // packageId
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [pkg, setPkg] = useState<any>(null);
  const [loadingPkg, setLoadingPkg] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    travellers: "1",
  });

  const [loading, setLoading] = useState(false);

  // Fetch package details
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`${API_BASE}/packages/${id}`);
        setPkg(res.data.data);
      } catch (err) {
        console.error("Package fetch error:", err);
      } finally {
        setLoadingPkg(false);
      }
    };
    fetchPackage();
  }, [id]);

  if (loadingPkg) {
    return <div className="min-h-screen flex items-center justify-center">Loading package...</div>;
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-2">Package not found</h1>
          <Link to="/packages" className="text-primary underline">← Back to packages</Link>
        </div>
      </div>
    );
  }

  const travellers = parseInt(form.travellers) || 1;
  const totalAdvance = Math.round(pkg.price * 0.3) * travellers;

  // Handle Razorpay payment
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please login first");
        return;
      }

      setLoading(true);

      // Create order on backend
      const res = await fetch(`${API_BASE}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          packageId: pkg.id,
          amount: totalAdvance,
        }),
      });

      if (!res.ok) throw new Error("Failed to create order");
      const data = await res.json();
      const order = data.data || data;

      if (!order?.id) throw new Error("Invalid order response");

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Sankhnadam Tours",
        description: "Advance Booking",
        order_id: order.id,
        handler: async function (response: any) {
          console.log("RAZORPAY RESPONSE:", response);
          // Verify payment
          const verifyRes = await fetch(`${API_BASE}/payment/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              name: form.name,
              email: form.email,
              phone: form.phone,
              date: form.date,
              travellers,
              packageId: pkg.id,
            }),
          });

          const result = await verifyRes.json();
          if (verifyRes.status === 200) {
            window.location.href = "/#/success"; // redirect to success page
          } else {
            alert(result.message || "Payment verification failed ❌");
          }
        },
        theme: { color: "#f97316" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      rzp.open();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container max-w-3xl">
          <ScrollReveal>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">Complete Your Booking</h1>
            <p className="text-muted-foreground text-center mb-10">
              Pay a small advance to reserve your spot on <strong>{pkg.title}</strong>
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Form */}
            <ScrollReveal className="md:col-span-3">
              <form className="bg-card rounded-lg p-6 shadow-md border border-border space-y-4">
                <h2 className="font-display text-lg font-bold flex items-center gap-2">
                  <CreditCard size={18} /> Traveller Details
                </h2>
                <div>
                  <label className="text-sm font-medium block mb-1">Full Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your full name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Phone</label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1">Preferred Date</label>
                    <select
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select date</option>
                      {pkg.startDates.map((d: string) => (
                        <option key={d} value={d}>
                          {new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Travellers</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={form.travellers}
                      onChange={(e) => setForm({ ...form, travellers: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all mt-2"
                >
                  {loading ? "Processing..." : `Pay ₹${totalAdvance.toLocaleString("en-IN")} Advance`}
                </button>

                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                  <ShieldCheck size={13} /> Secure payment • Remaining balance payable on tour day
                </p>
              </form>
            </ScrollReveal>

            {/* Summary */}
            <ScrollReveal className="md:col-span-2" delay={100}>
              <div className="bg-card rounded-lg p-5 shadow-md border border-border space-y-4">
                <img src={pkg.image} alt={pkg.title} className="w-full rounded-md aspect-video object-cover" />
                <h3 className="font-display font-bold text-base">{pkg.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {pkg.duration} • {pkg.location}
                </p>
                <div className="border-t border-border pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Package price</span>
                    <span>₹{pkg.price.toLocaleString("en-IN")} × {travellers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Advance (30%)</span>
                    <span className="font-bold text-primary">₹{totalAdvance.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Balance due on tour day</span>
                    <span>₹{(pkg.price * travellers - totalAdvance).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;