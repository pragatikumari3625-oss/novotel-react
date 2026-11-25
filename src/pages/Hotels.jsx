
import { useState, useEffect } from "react";

const defaultHotels = [
  {
    id: 1,
    name: "Novotel Premium",
    location: "Vijayawada",
    price: 3500,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700"
  },
  {
    id: 2,
    name: "Luxury Palace",
    location: "Hyderabad",
    price: 4500,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700"
  },
  {
    id: 3,
    name: "Royal Grand Hotel",
    location: "Bangalore",
    price: 5000,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700"
  },
  {
    id: 4,
    name: "Sea View Resort",
    location: "Goa",
    price: 6000,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=700"
  }
];

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedHotels = JSON.parse(
      localStorage.getItem("novotel_hotels") || "[]"
    );

    setHotels([
      ...defaultHotels,
      ...savedHotels.filter(
        (hotel) => !defaultHotels.some((item) => item.id === hotel.id)
      )
    ]);
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    `${hotel.name} ${hotel.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const bookHotel = (hotel) => {
    const existingBookings = JSON.parse(
      localStorage.getItem("novotel_bookings") || "[]"
    );

    const newBooking = {
      id: Date.now(),
      hotelName: hotel.name,
      location: hotel.location,
      totalPrice: hotel.price,
      status: "Booked"
    };

    localStorage.setItem(
      "novotel_bookings",
      JSON.stringify([...existingBookings, newBooking])
    );

    alert("Hotel booking saved successfully!");
  };

  return (
    <div className="hotels-page">
      <div className="hotels-heading">
        <h1>Explore Our Hotels</h1>
        <p>Find the perfect stay for your next journey.</p>

        <input
          type="text"
          placeholder="Search by hotel name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="hotel-grid">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <div className="hotel-card" key={hotel.id}>
              <img src={hotel.image} alt={hotel.name} />

              <div className="hotel-info">
                <h2>{hotel.name}</h2>
                <p>📍 {hotel.location}</p>
                <p>⭐ {hotel.rating || "New"}</p>

                <h3>₹{hotel.price} / night</h3>

                <button onClick={() => bookHotel(hotel)}>
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels found.</p>
        )}
      </div>
    </div>
  );
}

export default Hotels;
