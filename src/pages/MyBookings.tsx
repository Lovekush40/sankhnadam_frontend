import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { CalendarDays, Users, MapPin, Clock, IndianRupee, Trash2 } from "lucide-react";

export interface Booking {
  _id: string;
  packageId: string;
  packageTitle: string;
  packageImage: string;
  location: string;
  duration: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  travellers: number;
  advancePaid: number;
  totalPrice: number;
  bookedAt: string;
  status: string;
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id: string) => {
    try {
      // Optional: delete booking via API
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_BASE}/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update frontend list
      const updated = bookings.filter((b) => b._id !== id);
      setBookings(updated);
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 pt-24 pb-16 text-center">Loading bookings...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">
              My Bookings
            </h1>
            <p className="text-muted-foreground text-center mb-10">
              Your tour booking history 🙏
            </p>
          </ScrollReveal>

          {bookings.length === 0 ? (
            <ScrollReveal>
              <div className="text-center py-20">
                <span className="text-5xl block mb-4">📋</span>
                <h2 className="font-display text-xl font-bold mb-2">No bookings yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't booked any tours yet. Explore our packages and start your spiritual journey!
                </p>
                <Link
                  to="/packages"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
                >
                  Browse Packages
                </Link>
              </div>
            </ScrollReveal>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, i) => (
                <ScrollReveal key={booking._id} delay={i * 60}>
                  <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0">
                        <img
                          src={booking.packageImage}
                          alt={booking.packageTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-4 sm:p-5 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              to={`/packages/${booking.packageId}`}
                              className="font-display font-bold text-lg hover:text-primary transition-colors"
                            >
                              {booking.packageTitle}
                            </Link>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin size={12} /> {booking.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> {booking.duration}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDelete(booking._id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            title="Remove booking"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">Traveller</p>
                            <p className="font-medium">{booking.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <CalendarDays size={11} /> Tour Date
                            </p>
                            <p className="font-medium">
                              {new Date(booking.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Users size={11} /> Travellers
                            </p>
                            <p className="font-medium">{booking.travellers}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <IndianRupee size={11} /> Advance Paid
                            </p>
                            <p className="font-medium text-primary">
                              ₹{booking.advancePaid.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-muted-foreground">
                          <span>
                            Booked on{" "}
                            {new Date(booking.bookedAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {booking.status || "Confirmed"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;