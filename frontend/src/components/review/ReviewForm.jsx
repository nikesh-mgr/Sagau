import { useState } from "react";

import { FiStar } from "react-icons/fi";

import { createReview } from "../../api/reviewApi";

import { successToast, errorToast } from "../../utils/toast";

const ReviewForm = ({ agreementId, refresh }) => {
  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (rating === 0) {
      errorToast("Please select rating");

      return;
    }

    try {
      setLoading(true);

      await createReview(agreementId, {
        rating,
        comment,
      });

      successToast("Review submitted successfully");

      refresh();
    } catch (error) {
      console.log(error);

      errorToast(error?.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-5">Leave Review</h2>

      <div className="flex gap-3 mb-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => setRating(star)}>
            <FiStar
              size={30}
              className={
                star <= rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your experience..."
        className="w-full border rounded-xl p-4 h-32 outline-none"
      />

      <button
        disabled={loading}
        onClick={submitReview}
        className="mt-5 bg-primary text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default ReviewForm;
