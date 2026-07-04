import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUser,
} from "react-icons/fa";

import ClientLayout from "../../components/layouts/ClientLayout";

import useWorkerStore from "../../store/workerStore";
import useReviewStore from "../../store/reviewStore";

const WorkerProfile = () => {
  const { workerId } = useParams();

  const worker = useWorkerStore((state) => state.selectedWorker);

  const fetchWorker = useWorkerStore((state) => state.fetchWorker);

  const reviews = useReviewStore((state) => state.reviews);

  const summary = useReviewStore((state) => state.summary);

  const fetchWorkerReviews = useReviewStore(
    (state) => state.fetchWorkerReviews,
  );

  useEffect(() => {
    fetchWorker(workerId);
    fetchWorkerReviews(workerId);
  }, [workerId]);

  if (!worker) {
    return (
      <ClientLayout>
        <div className="text-center py-20">Loading...</div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="max-w-6xl mx-auto">
        {/* Profile */}

        <div className="bg-white rounded-xl shadow p-8">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold">{worker.user?.fullName}</h1>

              <p className="text-gray-500 mt-2">{worker.bio}</p>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <FaStar className="text-yellow-500" />

                <span className="font-bold text-2xl">
                  {summary.averageRating || 0}
                </span>
              </div>

              <p className="text-gray-500">
                {summary.totalReviews || 0} Reviews
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 rounded-lg p-5">
              <FaBriefcase className="text-blue-600 mb-2" />

              <p className="text-gray-500">Experience</p>

              <p className="font-bold">{worker.experience}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <FaMoneyBillWave className="text-green-600 mb-2" />

              <p className="text-gray-500">Hourly Rate</p>

              <p className="font-bold">NPR {worker.hourlyRate}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <FaMapMarkerAlt className="text-red-500 mb-2" />

              <p className="text-gray-500">Location</p>

              <p className="font-bold">{worker.location}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Skills</h2>

            <div className="flex flex-wrap gap-3">
              {worker.skills?.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}

        <div className="bg-white rounded-xl shadow mt-8 p-8">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>

          {reviews.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No reviews yet.
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border rounded-lg p-6">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <FaUser />

                        <span className="font-semibold">
                          {review.reviewer?.fullName}
                        </span>
                      </div>

                      <p className="text-gray-500 text-sm mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-500" />

                      <span className="font-bold">{review.rating}</span>
                    </div>
                  </div>

                  <p className="mt-5 leading-7 text-gray-700">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default WorkerProfile;
