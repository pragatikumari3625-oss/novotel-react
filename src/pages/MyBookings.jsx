
import { useState, useEffect } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => {
    const savedBookings = JSON.parse(
      localStorage.getItem("novotel_bookings")
    ) || [];

    const currentUser = JSON.parse(
      localStorage.getItem("novotel_user")
    );

    const userBookings = currentUser
      ? savedBookings.filter(
          (booking) =>
            booking.email === currentUser.email
        )
      : [];

    setBookings(userBookings);
  };

  useEffect(() => {
    loadBookings();

    window.addEventListener("storage", loadBookings);

    return () => {
      window.removeEventListener("storage", loadBookings);
    };
  }, []);

  return (
    <div style={{
      padding: "40px 6%",
      minHeight: "100vh",
      background: "#f5f7fb"
    }}>
      <h1>My Bookings</h1>
      <p>View and manage your hotel reservations.</p>

      {bookings.length === 0 ? (
        <div style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
          marginTop: "25px"
        }}>
          <h2>No Bookings Yet</h2>
          <p>Your hotel reservations will appear here.</p>
        </div>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              background: "white",
              padding: "25px",
              marginTop: "20px",
              borderRadius: "12px",
              boxShadow: "0 3px 12px #ddd"
            }}
          >
            <h2>{booking.hotelName || "Hotel Booking"}</h2>

            <p>Customer: {booking.name || booking.userName}</p>
            <p>Email: {booking.email}</p>
            <p>Check-in: {booking.checkIn || "N/A"}</p>
            <p>Check-out: {booking.checkOut || "N/A"}</p>
            <p>Total Amount: ₹{booking.totalPrice || 0}</p>

            <p>
              Booking Status:{" "}
              <strong style={{
                color:
                  booking.status === "Cancelled"
                    ? "red"
                    : booking.status === "Confirmed"
                    ? "green"
                    : "#2367e8"
              }}>
                {booking.status || "Booked"}
              </strong>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;
