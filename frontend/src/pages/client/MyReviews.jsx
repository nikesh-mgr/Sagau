import { useEffect, useState } from "react";

import {
  FiStar,
  FiUser,
  FiBriefcase,
  FiMessageSquare,
  FiCalendar,
  FiShield,
} from "react-icons/fi";

import { getMyReviews } from "../../api/reviewApi";

import { errorToast } from "../../utils/toast";

const SERVER_URL = "http://localhost:5000";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await getMyReviews();

      setReviews(response?.data || []);
    } catch (error) {
      console.log(error);

      errorToast(error?.response?.data?.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating = 0) => {
    return Array.from({
      length: 5,
    }).map((_, index) => (
      <FiStar
        key={index}
        size={18}
        className={
          index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
        }
      />
    ));
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div
            className="
          h-14
          w-14
          mx-auto
          rounded-full
          border-4
          border-emerald-600
          border-t-transparent
          animate-spin
          "
          />

          <p className="mt-5 text-gray-500">Loading Reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1
          className="
        text-3xl
        font-bold
        text-gray-900
        "
        >
          My Reviews
        </h1>

        <p
          className="
        mt-2
        text-gray-500
        "
        >
          Reviews you have given to workers after completed jobs.
        </p>
      </div>

      {reviews.length === 0 ? (
        <div
          className="
      bg-white
      rounded-3xl
      shadow
      border
      border-gray-200
      p-12
      text-center
      "
        >
          <FiMessageSquare
            size={60}
            className="
        mx-auto
        text-gray-300
        mb-5
        "
          />

          <h2
            className="
        text-2xl
        font-bold
        "
          >
            No Reviews Yet
          </h2>

          <p
            className="
        text-gray-500
        mt-3
        "
          >
            Reviews will appear after completed jobs.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="
      bg-white
      rounded-3xl
      shadow-sm
      border
      border-gray-200
      p-6
      md:p-8
      hover:shadow-lg
      transition
      "
            >
              {/* USER HEADER */}

              <div
                className="
      flex
      justify-between
      items-start
      flex-wrap
      gap-5
      "
              >
                <div
                  className="
        flex
        items-center
        gap-4
        "
                >
                  {/* WORKER IMAGE */}

                  <div
                    className="
        w-16
        h-16
        rounded-full
        overflow-hidden
        bg-emerald-100
        flex
        items-center
        justify-center
        "
                  >
                    {review.revieweeProfile?.profileImage ? (
                      <img
                        src={`${SERVER_URL}${review.revieweeProfile.profileImage}`}
                        alt="Worker"
                        className="
        w-full
        h-full
        object-cover
        "
                      />
                    ) : (
                      <FiUser size={30} className="text-emerald-600" />
                    )}
                  </div>

                  <div>
                    <div
                      className="
        flex
        items-center
        gap-2
        "
                    >
                      <h2
                        className="
        text-xl
        font-bold
        "
                      >
                        {review.reviewee?.fullName || "Worker"}
                      </h2>

                      <FiShield className="text-emerald-600" />
                    </div>

                    <p
                      className="
        text-gray-500
        "
                    >
                      {review.reviewee?.email || "Email unavailable"}
                    </p>
                  </div>
                </div>

                {/* RATING */}

                <div
                  className="
        flex
        items-center
        gap-3
        "
                >
                  <div className="flex">{renderStars(review.rating)}</div>

                  <span
                    className="
        font-bold
        text-lg
        "
                  >
                    {review.rating}/5
                  </span>
                </div>
              </div>

              {/* JOB INFORMATION */}

              <div
                className="
      grid
      md:grid-cols-2
      gap-6
      mt-8
      "
              >
                <div
                  className="
      flex
      gap-3
      "
                >
                  <FiBriefcase
                    className="
      text-emerald-600
      mt-1
      "
                  />

                  <div>
                    <p
                      className="
      text-sm
      text-gray-500
      "
                    >
                      Job
                    </p>

                    <p
                      className="
      font-semibold
      "
                    >
                      {review.agreement?.job?.title || "Completed Job"}
                    </p>
                  </div>
                </div>

                <div
                  className="
      flex
      gap-3
      "
                >
                  <FiCalendar
                    className="
      text-emerald-600
      mt-1
      "
                  />

                  <div>
                    <p
                      className="
      text-sm
      text-gray-500
      "
                    >
                      Reviewed Date
                    </p>

                    <p
                      className="
      font-semibold
      "
                    >
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* FEEDBACK */}

              <div className="mt-8">
                <h3
                  className="
      font-bold
      mb-3
      "
                >
                  Your Feedback
                </h3>

                <div
                  className="
      bg-gray-50
      rounded-2xl
      p-5
      text-gray-700
      leading-7
      "
                >
                  {review.comment || "No comment provided"}
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
