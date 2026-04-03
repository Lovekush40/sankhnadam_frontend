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
  IndianRupee,
  Trash2,
  PackageOpen,
  CheckCircle2,
  Clock3,
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

// ── Status badge config ────────────────────────────────────────────────────
const statusConfig: Record<
  string,
  { label: string; className: string; icon: React.ReactNode }
> = {
  partial: {
    label: "Advance Paid",
    className: "bg-amber-100 text-amber-700 border border-amber-200",
    icon: <Clock3 size={11} />,
  },
  paid: {
    label: "Fully Paid",
    className: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    icon: <CheckCircle2 size={11} />,
  },
  pending: {
    label: "Pending",
    className: "bg-slate-100 text-slate-600 border border-slate-200",
    icon: <Clock3 size={11} />,
  },
  failed: {
    label: "Failed",
    className: "bg-red-100 text-red-600 border border-red-200",
    icon: <XCircle size={11} />,
  },
};

const getStatus = (status?: string) => {
  const key = (status ?? "pending").toLowerCase();
  return (
    statusConfig[key] ?? {
      label: status?.toUpperCase() ?? "PENDING",
      className: "bg-slate-100 text-slate-600 border border-slate-200",
      icon: <Clock3 size={11} />,
    }
  );
};

// ── Component ──────────────────────────────────────────────────────────────
const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBookings = async () => {
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
    };

    fetchBookings();
  }, []);

  const handleDelete = async (_id: string) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    setDeletingId(_id);
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_BASE}/bookings/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b._id !== _id));
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // ── Loading skeleton ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 pt-24 pb-16">
          <div className="container max-w-4xl space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-pulse"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-44 h-36 bg-muted flex-shrink-0" />
                  <div className="flex-1 p-5 space-y-3">
                    <div className="h-5 w-2/3 bg-muted rounded" />
                    <div className="h-3 w-1/3 bg-muted rounded" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {[1, 2, 3, 4].map((j) => (
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

  // ── Empty state ──────────────────────────────────────────────────────────
  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-16">
          <ScrollReveal>
            <div className="text-center max-w-sm mx-auto px-6">
              <PackageOpen
                size={56}
                className="mx-auto mb-4 text-muted-foreground/40"
                strokeWidth={1.2}
              />
              <h2 className="font-display text-xl font-bold mb-2">
                No bookings yet
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                You haven't booked any tours yet. Explore our packages and start
                your spiritual journey!
              </p>
              <Link
                to="/packages"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
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

  // ── Main list ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-center mb-1">
              My Bookings
            </h1>
            <p className="text-muted-foreground text-center mb-10 text-sm">
              {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found 🙏
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {bookings.map((booking, i) => {
              const status = getStatus(booking.paymentStatus);
              const advance = booking.paidAmount ?? 0;
              const total = booking.totalAmount ?? 0;
              const remaining = booking.remainingAmount ?? total - advance;

              return (
                <ScrollReveal key={booking._id} delay={i * 60}>
                  <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row">

                      {/* ── Package image ── */}
                      <div className="sm:w-44 h-44 sm:h-auto flex-shrink-0 relative">
                        <img
                          src={booking.packageImage ?? "/default-package.jpg"}
                          alt={booking.packageName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/176x176/f3f4f6/9ca3af?text=Tour";
                          }}
                        />
                        {/* Status badge over image on mobile */}
                        <div className="absolute top-2 left-2 sm:hidden">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.className}`}
                          >
                            {status.icon}
                            {status.label}
                          </span>
                        </div>
                      </div>

                      {/* ── Details ── */}
                      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between gap-3 min-w-0">

                        {/* Title row */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <Link
                              to={`/packages/${booking.packageId}`}
                              className="font-display font-bold text-base sm:text-lg hover:text-primary transition-colors line-clamp-1"
                            >
                              {booking.packageName}
                            </Link>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
                              {booking.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin size={11} />
                                  {booking.location}
                                </span>
                              )}
                              {booking.duration && (
                                <span className="flex items-center gap-1">
                                  <Clock3 size={11} />
                                  {booking.duration}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {/* Status badge — desktop only */}
                            <span
                              className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.className}`}
                            >
                              {status.icon}
                              {status.label}
                            </span>
                            <button
                              onClick={() => handleDelete(booking._id)}
                              disabled={deletingId === booking._id}
                              className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-md hover:bg-destructive/10 disabled:opacity-40"
                              title="Remove booking"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Info grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-3 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-0.5">
                              <CalendarDays size={11} /> Tour Date
                            </p>
                            <p className="font-medium text-sm">
                              {booking.travelDate
                                ? new Date(booking.travelDate).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-0.5">
                              <Users size={11} /> Travellers
                            </p>
                            <p className="font-medium text-sm">
                              {booking.persons ?? 1}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-0.5">
                              <IndianRupee size={11} /> Advance Paid
                            </p>
                            <p className="font-medium text-sm text-primary">
                              ₹{advance.toLocaleString("en-IN")}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-0.5">
                              <IndianRupee size={11} /> Balance Due
                            </p>
                            <p className="font-medium text-sm text-amber-600">
                              ₹{remaining.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>

                        {/* Footer row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground">
                            Booked on{" "}
                            {new Date(booking.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
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