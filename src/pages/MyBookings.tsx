import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  CalendarDays,
  Users,
  MapPin,
  Clock3,
  IndianRupee,
  Trash2,
  PackageOpen,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export interface Booking {
  _id: string;
  packageId: string;
  packageName: string;
  packageImage?: string;
  location?: string;
  duration?: string;
  travelDate?: string;
  persons?: number;
  paidAmount?: number;
  remainingAmount?: number;
  totalAmount?: number;
  createdAt: string;
  paymentStatus?: string;
}

// ── Status badge ────────────────────────────────────────────────────────────
const STATUS: Record<string, { label: string; bg: string; color: string; icon: React.ReactNode }> = {
  partial: { label: "Advance Paid", bg: "#fef3c7", color: "#92400e", icon: <Clock3 size={11} /> },
  paid:    { label: "Fully Paid",   bg: "#d1fae5", color: "#065f46", icon: <CheckCircle2 size={11} /> },
  pending: { label: "Pending",      bg: "#f1f5f9", color: "#475569", icon: <Clock3 size={11} /> },
  failed:  { label: "Failed",       bg: "#fee2e2", color: "#991b1b", icon: <XCircle size={11} /> },
};

const getStatus = (s?: string) =>
  STATUS[(s ?? "pending").toLowerCase()] ?? STATUS.pending;

const fmt = (date: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(date).toLocaleDateString("en-IN", opts);

// ── Component ───────────────────────────────────────────────────────────────
const MyBookings = () => {
  const [bookings, setBookings]   = useState<Booking[]>([]);
  const [loading, setLoading]     = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;
        const res = await axios.get(`${API_BASE}/bookings/my-bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data.data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (_id: string) => {
    if (!window.confirm("Delete this booking?")) return;
    setDeletingId(_id);
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_BASE}/bookings/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b._id !== _id));
    } catch {
      alert("Failed to delete booking. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // ── Skeleton ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-border bg-card shadow-sm overflow-hidden animate-pulse">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-44 h-36 bg-muted flex-shrink-0" />
                  <div className="flex-1 p-5 space-y-3">
                    <div className="h-5 w-2/3 bg-muted rounded" />
                    <div className="h-3 w-1/3 bg-muted rounded" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {[1,2,3,4].map((j) => (
                        <div key={j} className="space-y-1">
                          <div className="h-2 w-16 bg-muted rounded" />
                          <div className="h-4 w-20 bg-muted rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Empty ──────────────────────────────────────────────────────────────────
  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <ScrollReveal>
            <div className="text-center max-w-sm mx-auto">
              <PackageOpen size={56} strokeWidth={1.2} className="mx-auto mb-4" style={{ color: "#d1d5db" }} />
              <h2 className="text-xl font-bold mb-2 text-foreground">No bookings yet</h2>
              <p className="text-sm text-muted-foreground mb-6">
                You haven't booked any tours yet. Explore our packages and start your spiritual journey!
              </p>
              <Link
                to="/packages"
                className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#f97316", color: "#ffffff" }}
              >
                Browse Packages
              </Link>
            </div>
          </ScrollReveal>
        </div>
        <Footer />
      </div>
    );
  }

  // ── List ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">

          <ScrollReveal>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-center mb-1 text-foreground">
              My Bookings
            </h1>
            <p className="text-center mb-10 text-sm text-muted-foreground">
              {bookings.length} booking{bookings.length !== 1 ? "s" : ""} • Radhe Radhe 🙏
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {bookings.map((booking, i) => {
              const st        = getStatus(booking.paymentStatus);
              const advance   = booking.paidAmount ?? 0;
              const total     = booking.totalAmount ?? 0;
              const remaining = booking.remainingAmount ?? (total - advance);

              return (
                <ScrollReveal key={booking._id} delay={i * 60}>
                  <div className="rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div className="flex flex-col sm:flex-row w-full">

                      {/* Image */}
                      <div className="relative w-full sm:w-44 h-44 sm:h-auto flex-shrink-0">
                        <img
                          src={booking.packageImage ?? ""}
                          alt={booking.packageName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const t = e.target as HTMLImageElement;
                            t.src = `https://placehold.co/176x176/fff7ed/f97316?text=${encodeURIComponent(booking.packageName.slice(0,8))}`;
                          }}
                        />
                        {/* Mobile status badge */}
                        <span
                          className="absolute top-2 left-2 sm:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ backgroundColor: st.bg, color: st.color }}
                        >
                          {st.icon}{st.label}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 gap-3 min-w-0">

                        {/* Title + status + delete */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <Link
                              to={`/packages/${booking.packageId}`}
                              className="font-bold text-base sm:text-lg leading-snug line-clamp-2 hover:underline text-foreground"
                            >
                              {booking.packageName}
                            </Link>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                              {booking.location && (
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MapPin size={11} style={{ color: "#f97316" }} />
                                  {booking.location}
                                </span>
                              )}
                              {booking.duration && (
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock3 size={11} style={{ color: "#f97316" }} />
                                  {booking.duration}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {/* Desktop status */}
                            <span
                              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                              style={{ backgroundColor: st.bg, color: st.color }}
                            >
                              {st.icon}{st.label}
                            </span>
                            <button
                              onClick={() => handleDelete(booking._id)}
                              disabled={deletingId === booking._id}
                              className="p-1.5 rounded-md transition-colors disabled:opacity-40 text-muted-foreground hover:text-red-500 hover:bg-red-50"
                              title="Delete booking"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3">
                          {/* Tour Date */}
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                              <CalendarDays size={11} /> Tour Date
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                              {booking.travelDate
                                ? fmt(booking.travelDate, { day: "numeric", month: "short", year: "numeric" })
                                : <span className="text-muted-foreground font-normal">Not set</span>}
                            </p>
                          </div>

                          {/* Travellers */}
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                              <Users size={11} /> Travellers
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                              {booking.persons ?? 1}
                            </p>
                          </div>

                          {/* Advance Paid */}
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                              <IndianRupee size={11} /> Advance Paid
                            </p>
                            <p className="text-sm font-semibold" style={{ color: "#16a34a" }}>
                              ₹{advance.toLocaleString("en-IN")}
                            </p>
                          </div>

                          {/* Balance Due */}
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                              <IndianRupee size={11} /> Balance Due
                            </p>
                            <p className="text-sm font-semibold" style={{ color: "#d97706" }}>
                              ₹{remaining.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground">
                            Booked {fmt(booking.createdAt, { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                          {total > 0 && (
                            <p className="text-xs text-muted-foreground">
                              Total:{" "}
                              <span className="font-semibold text-foreground">
                                ₹{total.toLocaleString("en-IN")}
                              </span>
                            </p>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyBookings;