import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ClientLayout from "../../components/layouts/ClientLayout";

import useWorkerStore from "../../store/workerStore";
import useReviewStore from "../../store/reviewStore";

import ReviewCard from "../../components/review/ReviewCard";
import StarRating from "../../components/review/StarRating";

const WorkerProfile = () => {
  const { workerId } = useParams();

  const worker = useWorkerStore((state) => state.currentWorker);

  const fetchWorker = useWorkerStore((state) => state.fetchWorkerById);

  const {
    reviews,
    averageRating,
    totalReviews,
    reputationScore,
    fetchWorkerReviews,
  } = useReviewStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchWorker(workerId);

        await fetchWorkerReviews(workerId);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [workerId]);

  if (!worker) {
    return (
      <ClientLayout>
        <h2>Loading...</h2>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* PROFILE */}

        <div className="bg-white rounded-xl shadow p-8">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold">{worker.user.fullName}</h1>

              <p className="text-gray-500 mt-2">{worker.location}</p>

              <div className="mt-4">
                <StarRating rating={averageRating} />
              </div>
            </div>

            <div className="text-right">
              <div className="mb-3">
                <p className="text-gray-500">Hourly Rate</p>

                <p className="font-bold text-xl">NPR {worker.hourlyRate}</p>
              </div>

              <div>
                <p className="text-gray-500">Experience</p>

                <p>{worker.experience}</p>
              </div>
            </div>
          </div>

          <hr className="my-8" />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-5 text-center">
              <h2 className="text-4xl font-bold text-blue-600">
                {averageRating}
              </h2>

              <p>Average Rating</p>
            </div>

            <div className="bg-green-50 rounded-xl p-5 text-center">
              <h2 className="text-4xl font-bold text-green-600">
                {totalReviews}
              </h2>

              <p>Total Reviews</p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-5 text-center">
              <h2 className="text-4xl font-bold text-yellow-600">
                {reputationScore}
              </h2>

              <p>Reputation Score</p>
            </div>
          </div>

          <hr className="my-8" />

          <div>
            <h2 className="font-bold text-xl mb-4">Bio</h2>

            <p>{worker.bio}</p>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-xl mb-4">Skills</h2>

            <div className="flex flex-wrap gap-2">
              {worker.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* REVIEWS */}

        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>

          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <div className="space-y-5">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default WorkerProfile;
