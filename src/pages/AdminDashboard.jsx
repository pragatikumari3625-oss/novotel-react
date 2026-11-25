
import { useState, useEffect } from "react";

function AdminDashboard() {
  const [hotels, setHotels] = useState(() => {
    return JSON.parse(localStorage.getItem("novotel_hotels")) || [
      {
        id: 1,
        name: "Novotel Premium",
        location: "Vijayawada",
        price: 3500,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500"
      },
      {
        id: 2,
        name: "Luxury Palace",
        location: "Hyderabad",
        price: 4500,
        image:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500"
      }
    ];
  });

  const [bookings, setBookings] = useState(() => {
    return JSON.parse(localStorage.getItem("novotel_bookings")) || [];
  });

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // Save hotels whenever they change
  useEffect(() => {
    localStorage.setItem("novotel_hotels", JSON.stringify(hotels));
  }, [hotels]);

  // Listen for booking changes made in another browser tab
  useEffect(() => {
    const loadBookings = () => {
      const savedBookings = JSON.parse(
        localStorage.getItem("novotel_bookings")
      ) || [];

      setBookings(savedBookings);
    };

    window.addEventListener("storage", loadBookings);

    return () => {
      window.removeEventListener("storage", loadBookings);
    };
  }, []);

  // Add a new hotel
  const addHotel = (e) => {
    e.preventDefault();

    if (!name || !location || !price) {
      alert("Please fill all required fields");
      return;
    }

    const newHotel = {
      id: Date.now(),
      name,
      location,
      price: Number(price),
      image:
        image ||
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500"
    };

    setHotels((previousHotels) => [...previousHotels, newHotel]);

    setName("");
    setLocation("");
    setPrice("");
    setImage("");

    alert("Hotel added successfully!");
  };

  // Delete a hotel
  const deleteHotel = (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      setHotels((previousHotels) =>
        previousHotels.filter((hotel) => hotel.id !== id)
      );
    }
  };

  // Update a booking status
  const updateBookingStatus = (id, newStatus) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id
        ? { ...booking, status: newStatus }
        : booking
    );

    setBookings(updatedBookings);

    localStorage.setItem(
      "novotel_bookings",
      JSON.stringify(updatedBookings)
    );

    alert("Booking status updated successfully!");
  };

  // Calculate revenue excluding cancelled bookings
  const totalRevenue = bookings.reduce((total, booking) => {
    if (booking.status === "Cancelled") {
      return total;
    }

    return total + Number(booking.totalPrice || 0);
  }, 0);

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h2>Novotel Admin Panel</h2>
        <span>Administrator</span>
      </header>

      <div className="admin-content">
        <h1>Dashboard Overview</h1>
        <p>Manage your hotels and customer bookings.</p>

        <div className="admin-stats">
          <div className="admin-stat">
            <h3>Total Hotels</h3>
            <h1>{hotels.length}</h1>
          </div>

          <div className="admin-stat">
            <h3>Total Bookings</h3>
            <h1>{bookings.length}</h1>
          </div>

          <div className="admin-stat">
            <h3>Total Revenue</h3>
            <h1>₹{totalRevenue}</h1>
          </div>
        </div>

        <section className="admin-section">
          <h2>Add New Hotel</h2>

          <form onSubmit={addHotel} className="admin-form">
            <input
              type="text"
              placeholder="Hotel Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Hotel Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Price per Night"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="1"
              required
            />

            <input
              type="url"
              placeholder="Hotel Image URL (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <button type="submit">+ Add Hotel</button>
          </form>
        </section>

        <section className="admin-section">
          <h2>Manage Hotels</h2>

          <div className="admin-hotel-list">
            {hotels.map((hotel) => (
              <div className="admin-hotel" key={hotel.id}>
                <img src={hotel.image} alt={hotel.name} />

                <div>
                  <h3>{hotel.name}</h3>
                  <p>{hotel.location}</p>
                  <strong>₹{hotel.price} / night</strong>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteHotel(hotel.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-section">
          <h2>Customer Bookings</h2>

          {bookings.length === 0 ? (
            <p>No bookings available yet.</p>
          ) : (
            bookings.map((booking, index) => (
              <div className="admin-booking" key={booking.id || index}>
                <h3>{booking.hotelName || "Hotel Booking"}</h3>

                <p>
                  Customer:{" "}
                  {booking.name || booking.userName || "N/A"}
                </p>

                <p>Email: {booking.email || "N/A"}</p>

                <p>Amount: ₹{booking.totalPrice || 0}</p>

                <p>
                  Current Status:{" "}
                  <strong>{booking.status || "Booked"}</strong>
                </p>

                <label>Update Booking Status:</label>

                <select
                  value={booking.status || "Booked"}
                  onChange={(e) =>
                    updateBookingStatus(booking.id, e.target.value)
                  }
                >
                  <option value="Booked">Booked</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
