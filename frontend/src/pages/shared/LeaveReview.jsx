import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import ClientLayout from "../../components/layouts/ClientLayout";
import WorkerLayout from "../../components/layouts/WorkerLayout";

import useAuthStore from "../../store/authStore";
import useReviewStore from "../../store/reviewStore";

import { successToast, errorToast } from "../../utils/toast";

const LeaveReview = () => {
  const { agreementId } = useParams();

  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const submitReview = useReviewStore((state) => state.submitReview);

  const loading = useReviewStore((state) => state.loading);

  const [rating, setRating] = useState(5);

  const [hover, setHover] = useState(0);

  const [comment, setComment] = useState("");

  const Layout = user?.role === "client" ? ClientLayout : WorkerLayout;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitReview(agreementId, {
        rating,
        comment,
      });

      successToast("Review submitted successfully");

      navigate("/agreements");
    } catch (error) {
      console.error(error);

      errorToast(error.response?.data?.message || "Unable to submit review");
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Leave a Review</h1>

          <p className="text-gray-500 mb-8">
            Rate your experience with the other participant.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="font-semibold block mb-4">Rating</label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={40}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className={`cursor-pointer transition ${
                      star <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold block mb-3">Comment</label>

              <textarea
                rows="6"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="w-full border rounded-lg p-4"
              />
            </div>

            <button
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LeaveReview;
