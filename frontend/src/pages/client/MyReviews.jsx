import { useEffect, useState } from "react";

import { FiStar, FiUser, FiBriefcase, FiMessageSquare } from "react-icons/fi";

import { getMyReviews } from "../../api/reviewApi";

import { errorToast } from "../../utils/toast";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await getMyReviews();

      setReviews(response.data || []);
    } catch (error) {
      console.log(error);

      errorToast("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex justify-center items-center">
        Loading Reviews...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Reviews</h1>

        <p className="text-gray-500 mt-2">
          Reviews you have given to workers after completed jobs.
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-12 text-center">
          <FiMessageSquare size={60} className="mx-auto text-gray-300 mb-5" />

          <h2 className="text-2xl font-bold">No Reviews Yet</h2>

          <p className="text-gray-500 mt-3">
            Reviews will appear after you complete jobs and review workers.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="
                bg-white
                rounded-2xl
                shadow
                border
                border-gray-200
                p-8
                "
            >
              <div className="flex justify-between items-start flex-wrap gap-5">
                <div className="flex gap-4 items-center">
                  <div
                    className="
                      w-14
                      h-14
                      rounded-full
                      bg-primary/10
                      flex
                      items-center
                      justify-center
                      "
                  >
                    <FiUser size={28} className="text-primary" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      {review.reviewee?.fullName}
                    </h2>

                    <p className="text-gray-500">{review.reviewee?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FiStar className="text-yellow-500" />

                  <span className="font-bold text-lg">{review.rating}/5</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="flex gap-3">
                  <FiBriefcase className="text-primary mt-1" />

                  <div>
                    <p className="text-gray-500 text-sm">Job</p>

                    <p className="font-semibold">
                      {review.agreement?.job?.title || "Completed Job"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Reviewed Date</p>

                  <p className="font-semibold">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-3">Your Feedback</h3>

                <div
                  className="
                    bg-gray-50
                    rounded-xl
                    p-5
                    text-gray-700
                    leading-7
                    "
                >
                  {review.comment}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
