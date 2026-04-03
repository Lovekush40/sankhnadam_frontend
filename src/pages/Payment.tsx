import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ShieldCheck, CreditCard, Users, Calendar } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment = () => {
  const { id } = useParams();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    travellers: "1",
  });
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay SDK");
      }

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
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        handler: async function (response: any) {
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

  const travellers = parseInt(form.travellers) || 1;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container max-w-3xl">
          {/* Header */}
          <ScrollReveal>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">
              Complete Your Booking
            </h1>
            <p className="text-muted-foreground text-center mb-10">
              Pay a small advance to reserve your spot on this tour
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-5 gap-8">
            {/* ── Left: Traveller Details Form ── */}
            <ScrollReveal className="md:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-xl p-6 shadow-md border border-border space-y-5"
              >
                <h2 className="font-display text-lg font-bold flex items-center gap-2">
                  <CreditCard size={18} className="text-primary" />
                  Traveller Details
                </h2>

                {/* Full Name */}
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Full Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Phone
                    </label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Date + Travellers */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Preferred Date
                    </label>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Travellers
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={form.travellers}
                      onChange={(e) =>
                        setForm({ ...form, travellers: e.target.value })
                      }
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                    />
                  </div>
                </div>

                {/* Pay button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing…" : "Pay Advance"}
                </button>

                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                  <ShieldCheck size={13} />
                  Secure payment via Razorpay • Remaining balance payable on
                  tour day
                </p>
              </form>
            </ScrollReveal>

            {/* ── Right: Booking Summary ── */}
            <ScrollReveal className="md:col-span-2" delay={100}>
              <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
                <div className="p-5 space-y-4">
                  <h3 className="font-display font-bold text-base">
                    Booking Summary
                  </h3>

                  <div className="space-y-2.5">
                    {form.date && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} className="text-primary shrink-0" />
                        <span>
                          {new Date(form.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users size={14} className="text-primary shrink-0" />
                      <span>
                        {travellers} traveller{travellers > 1 ? "s" : ""}
                      </span>
                    </div>
                    {form.name && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CreditCard
                          size={14}
                          className="text-primary shrink-0"
                        />
                        <span>{form.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Package amount</span>
                      <span>As per package</span>
                    </div>
                    <div className="flex justify-between font-semibold text-primary">
                      <span>Advance (30%)</span>
                      <span>Via Razorpay</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground border-t border-border pt-2">
                      <span>Balance due on tour day</span>
                      <span>Remaining 70%</span>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-3 text-xs text-muted-foreground leading-relaxed">
                    💡 Your advance secures the booking. The remaining balance
                    is collected on the tour day. Radhe Radhe! 🙏
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