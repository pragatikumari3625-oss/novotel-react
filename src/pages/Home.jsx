
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelCard from '../components/HotelCard';

function Home() {
  const navigate = useNavigate();

  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const hotels = [
    {
      id: 1,
      name: 'Grand Palace Hotel',
      location: 'Vijayawada',
      price: 3500,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700'
    },
    {
      id: 2,
      name: 'Royal Paradise',
      location: 'Hyderabad',
      price: 4200,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700'
    },
    {
      id: 3,
      name: 'Ocean View Resort',
      location: 'Goa',
      price: 5000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=700'
    }
  ];

  const destinations = [
    
    {
      name: 'Hyderabad',
      description: 'City of pearls',
      image: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=600'
    },
    {
      name: 'Bangalore',
      description: 'Garden city',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600'
    },
    {
      name: 'Vijayawada',
      description: 'City of victory',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    if (!location.trim()) {
      alert('Please enter a destination!');
      return;
    }

    const params = new URLSearchParams({
      location,
      checkIn,
      checkOut,
      guests
    });

    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <div className="home-page">

      {/* HERO SECTION */}

      <section className="hero">
        <div className="hero-overlay">
          <div className="container hero-content">

            <span className="hero-label">
              WELCOME TO NOVOTEL
            </span>

            <h1>
              Find Your Perfect
              <br />
              <span>Place To Stay</span>
            </h1>

            <p>
              Discover amazing hotels, compare prices
              and book your perfect stay with NOVOTEL.
            </p>

            {/* HOTEL SEARCH */}

            <form className="search-box" onSubmit={handleSearch}>

              <div className="search-field">
                <label>Destination</label>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="search-field">
                <label>Check In</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div className="search-field">
                <label>Check Out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              <div className="search-field">
                <label>Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                </select>
              </div>

              <button type="submit" className="search-button">
                Search Hotels
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}

      <section className="section container">

        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE PLACES</span>
            <h2 className="section-title">
              Popular Destinations
            </h2>
            <p className="section-subtitle">
              Explore the most loved travel destinations.
            </p>
          </div>
        </div>

        <div className="destination-grid">
          {destinations.map((place) => (
            <div
              className="destination-card"
              key={place.name}
              style={{ backgroundImage: `url(${place.image})` }}
              onClick={() => navigate(
                `/hotels?location=${encodeURIComponent(place.name)}`
              )}
            >
              <div className="destination-info">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* FEATURED HOTELS */}

      <section className="section featured-section">

        <div className="container">

          <span className="section-label">OUR COLLECTION</span>

          <h2 className="section-title">
            Featured Hotels
          </h2>

          <p className="section-subtitle">
            Discover comfortable stays at amazing prices.
          </p>

          <div className="hotel-grid">
            {hotels.map((hotel) => (
              <HotelCard hotel={hotel} key={hotel.id} />
            ))}
          </div>

          <div className="view-all">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/hotels')}
            >
              Explore All Hotels
            </button>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}

      <section className="section container">

        <div className="why-heading">
          <span className="section-label">WHY NOVOTEL?</span>
          <h2 className="section-title">
            Your Journey, Our Priority
          </h2>
        </div>

        <div className="why-grid">

          <div className="why-card">
            <span>🏨</span>
            <h3>Best Hotels</h3>
            <p>Choose from carefully selected hotels.</p>
          </div>

          <div className="why-card">
            <span>💰</span>
            <h3>Best Prices</h3>
            <p>Find comfortable stays at affordable prices.</p>
          </div>

          <div className="why-card">
            <span>🔒</span>
            <h3>Easy Booking</h3>
            <p>Enjoy a simple and convenient booking experience.</p>
          </div>

          <div className="why-card">
            <span>⭐</span>
            <h3>Guest Reviews</h3>
            <p>Make better choices with guest feedback.</p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;
