import StarRating from "./StarRating";

const ReviewCard = ({ review }) => {
  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold">{review.reviewer.fullName}</h3>

          <p className="text-sm text-gray-500">{review.reviewer.role}</p>
        </div>

        <StarRating rating={review.rating} />
      </div>

      <p className="mt-4 text-gray-700">{review.comment}</p>

      <p className="text-xs text-gray-400 mt-3">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};
export default ReviewCard;
