
import { useState } from "react";

function Reviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      hotel: "Novotel Premium",
      rating: 5,
      comment: "Amazing hotel and excellent service!"
    },
    {
      id: 2,
      name: "Priya Singh",
      hotel: "Luxury Palace",
      rating: 4,
      comment: "Very comfortable rooms and friendly staff."
    },
    {
      id: 3,
      name: "Amit Kumar",
      hotel: "Royal Grand Hotel",
      rating: 5,
      comment: "Wonderful experience. Highly recommended!"
    }
  ]);

  const [name, setName] = useState("");
  const [hotel, setHotel] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  const addReview = (e) => {
    e.preventDefault();

    const newReview = {
      id: Date.now(),
      name,
      hotel,
      rating: Number(rating),
      comment
    };

    setReviews([...reviews, newReview]);

    setName("");
    setHotel("");
    setRating("5");
    setComment("");

    alert("Review submitted successfully!");
  };

  return (
    <div className="reviews-page">
      <h1>Customer Reviews</h1>
      <p>See what our guests say about NOVOTEL.</p>

      <div className="review-grid">
        {reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <h3>{review.name}</h3>
            <p>{review.hotel}</p>
            <div className="stars">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      <div className="review-form">
        <h2>Write a Review</h2>

        <form onSubmit={addReview}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Hotel Name"
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
            required
          />

          <label>Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <textarea
            placeholder="Write your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default Reviews;
