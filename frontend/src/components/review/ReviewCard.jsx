import { FiStar, FiUser } from "react-icons/fi";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="bg-gray-100 rounded-full p-3">
            <FiUser />
          </div>

          <div>
            <h3 className="font-semibold">{review.reviewer?.fullName}</h3>

            <p className="text-sm text-gray-500">{review.reviewer?.role}</p>
          </div>
        </div>

        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              className={
                star <= review.rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
      </div>

      <p className="text-gray-600 mt-5">{review.comment || "No comment"}</p>

      <p className="text-xs text-gray-400 mt-4">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReviewCard;
