import { useEffect, useState } from "react";

import { FiStar, FiAward } from "react-icons/fi";

import ReviewCard from "../../components/review/ReviewCard";

import { getWorkerReviews } from "../../api/reviewApi";

import { getMyWorkerProfile } from "../../api/workerApi";

import { errorToast } from "../../utils/toast";

const Reviews = () => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      // First get worker profile
      const profileResponse = await getMyWorkerProfile();

      const workerId = profileResponse.data._id;

      // Then get reviews using Worker ID
      const reviewResponse = await getWorkerReviews(workerId);

      setData(reviewResponse.data);
    } catch (error) {
      console.log("REVIEW LOAD ERROR:", error.response?.data || error);

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

        <p className="text-gray-500">Client feedback and reputation.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <FiStar size={30} className="text-yellow-500" />

          <h2 className="text-3xl font-bold mt-3">
            {data?.averageRating || 0}
          </h2>

          <p className="text-gray-500">Average Rating</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FiAward size={30} />

          <h2 className="text-3xl font-bold mt-3">
            {data?.reputationScore || 0}
          </h2>

          <p className="text-gray-500">Reputation Score</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-3xl font-bold">{data?.totalReviews || 0}</h2>

          <p className="text-gray-500">Total Reviews</p>
        </div>
      </div>

      <div className="space-y-5">
        {data?.reviews?.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center">
            No reviews yet
          </div>
        ) : (
          data?.reviews?.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
