
import { useNavigate } from 'react-router-dom';

function HotelCard({ hotel }) {
  const navigate = useNavigate();

  return (
    <div className="card hotel-card">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="hotel-image"
      />

      <div className="hotel-info">
        <h3>{hotel.name}</h3>

        <p>📍 {hotel.location}</p>

        <p>⭐ {hotel.rating} / 5</p>

        <div className="hotel-price">
          <strong>₹{hotel.price}</strong>
          <span> / night</span>
        </div>

        <button
          className="btn btn-primary full-btn"
          onClick={() => navigate('/hotels')}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default HotelCard;
