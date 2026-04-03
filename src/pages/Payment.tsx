import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ShieldCheck,
  CreditCard,
  Users,
  Calendar,
  MapPin,
  Clock,
  IndianRupee,
  Loader2,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PackageInfo {
  _id: string;
  title: string;
  price: number;
  location?: string;
  duration?: string;
  image?: string;
}

const Payment = () => {
  const { id } = useParams();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [pkg, setPkg] = useState<PackageInfo | null>(null);
  const [pkgLoading, setPkgLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    travellers: "1",
  });

  const travellers   = Math.max(1, parseInt(form.travellers) || 1);
  const totalAmount  = pkg ? pkg.price * travellers : 0;
  const advanceAmount = pkg ? Math.round(totalAmount * 0.3) : 0;
  const balanceAmount = totalAmount - advanceAmount;

  // Fetch package info so amounts show before paying
  useEffect(() => {
    if (!id) return;
    const fetchPkg = async () => {
      try {
        const res = await fetch(`${API_BASE}/packages/${id}`);
        const data = await res.json();
        setPkg(data.data || data);
      } catch (err) {
        console.error("Failed to fetch package:", err);
      } finally {
        setPkgLoading(false);
      }
    };
    fetchPkg();
  }, [id]);

  const loadRazorpayScript = (): Promise<boolean> =>
    new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload  = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) { alert("Please login first"); return; }

    setLoading(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("Failed to load Razorpay SDK");

      const res = await fetch(`${API_BASE}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // ✅ Send travelDate so backend stores it on the booking
        body: JSON.stringify({
          packageId: id,
          persons: travellers,
          travelDate: form.date,
        }),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const data  = await res.json();
      const order = data.data || data;
      if (!order?.id) throw new Error("Invalid order response");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Sankhnadam Tours",
        description: `Advance – ${pkg?.title ?? "Tour Package"}`,
        order_id: order.id,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        handler: async function (response: any) {
          console.log("RAZORPAY RESPONSE:", response);
          const verifyRes = await fetch(`${API_BASE}/payment/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_signature:  response.razorpay_signature,
            }),
          });
          const result = await verifyRes.json();
          if (verifyRes.status === 200) {
            window.location.href = "/#/success";
          } else {
            alert(result.message || "Payment verification failed ❌");
          }
        },
        theme: { color: "#f97316" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (r: any) => alert(r.error.description));
      rzp.open();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (pkgLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-24">
          <Loader2 className="animate-spin text-orange-500" size={32} />
        </div>
        <Footer />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-24">
          <div className="text-center">
            <p className="text-2xl font-bold mb-2">Package not found</p>
            <a href="/packages" className="text-orange-500 underline">← Back to packages</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">

          <ScrollReveal>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-center mb-1 text-foreground">
              Complete Your Booking
            </h1>
            <p className="text-center mb-10 text-sm text-muted-foreground">
              Reserve your spot on{" "}
              <span className="font-semibold text-foreground">{pkg.title}</span>
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-5 gap-6">

            {/* ── Form ── */}
            <ScrollReveal className="md:col-span-3 order-2 md:order-1">
              <form
                onSubmit={handleSubmit}
                className="rounded-xl p-6 shadow-md border border-border bg-card space-y-4"
              >
                <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <CreditCard size={18} className="text-orange-500" />
                  Traveller Details
                </h2>

                <div>
                  <label className="text-sm font-medium block mb-1 text-foreground">Full Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 transition placeholder:text-muted-foreground"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1 text-foreground">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 transition placeholder:text-muted-foreground"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1 text-foreground">Phone</label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 transition placeholder:text-muted-foreground"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1 text-foreground">Travel Date</label>
                    <input
                      required
                      type="date"
                      value={form.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1 text-foreground">Travellers</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={form.travellers}
                      onChange={(e) => setForm({ ...form, travellers: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg font-semibold text-sm transition-all active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Processing…</>
                  ) : (
                    <><IndianRupee size={15} /> Pay ₹{advanceAmount.toLocaleString("en-IN")} Advance</>
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                  <ShieldCheck size={13} className="text-green-500" />
                  Secure payment via Razorpay • Balance payable on tour day
                </p>
              </form>
            </ScrollReveal>

            {/* ── Summary ── */}
            <ScrollReveal className="md:col-span-2 order-1 md:order-2" delay={100}>
              <div className="rounded-xl shadow-md border border-border bg-card overflow-hidden">
                {pkg.image && (
                  <div className="relative h-40 w-full">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-sm leading-snug line-clamp-2">{pkg.title}</p>
                    </div>
                  </div>
                )}

                <div className="p-4 space-y-4">
                  <div className="space-y-1.5">
                    {pkg.location && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin size={12} className="text-orange-500 shrink-0" />
                        {pkg.location}
                      </div>
                    )}
                    {pkg.duration && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock size={12} className="text-orange-500 shrink-0" />
                        {pkg.duration}
                      </div>
                    )}
                    {form.date && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar size={12} className="text-orange-500 shrink-0" />
                        {new Date(form.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users size={12} className="text-orange-500 shrink-0" />
                      {travellers} traveller{travellers > 1 ? "s" : ""}
                    </div>
                  </div>

                  {/* Live price breakdown */}
                  <div className="border-t border-border pt-3 space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹{pkg.price.toLocaleString("en-IN")} × {travellers}</span>
                      <span className="text-foreground font-medium">₹{totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Advance (30%)</span>
                      <span className="font-bold text-base" style={{ color: "#f97316" }}>
                        ₹{advanceAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground border-t border-border pt-2">
                      <span>Balance on tour day</span>
                      <span className="font-medium text-foreground">₹{balanceAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="rounded-lg p-3 text-xs text-muted-foreground leading-relaxed" style={{ backgroundColor: "rgba(249,115,22,0.07)" }}>
                    💡 Advance secures your booking. Remaining paid on tour day. Radhe Radhe! 🙏
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