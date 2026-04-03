import { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Your backend API URL

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("authToken"); // JWT token
        const res = await axios.get(`${API_BASE}/bookings/my-booking`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Assuming your ApiResponse returns data in `data.data`
        setBookings(res.data.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-lg shadow p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{booking.packageName}</h2>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-bold ${
                    booking.status === "Confirmed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <p>
                <strong>Booking Date:</strong>{" "}
                {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;