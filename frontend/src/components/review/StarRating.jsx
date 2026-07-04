import { FaStar } from "react-icons/fa";

const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={
            star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"
          }
        />
      ))}

      <span className="ml-2 text-sm font-semibold">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
