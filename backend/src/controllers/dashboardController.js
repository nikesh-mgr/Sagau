import asyncHandler from "../utils/asyncHandler.js";
export const getWorkerDashboard = asyncHandler(async (req, res) => {
  const workerId = req.user._id;

  const profile = await Worker.findOne({
    user: workerId,
  }).populate("user", "fullName email");

  const applications = await Application.find({
    worker: workerId,
  });

  const availableJobs = await Job.countDocuments({
    status: "OPEN",
  });

  const accepted = applications.filter(
    (application) => application.status === "ACCEPTED",
  ).length;

  const pending = applications.filter(
    (application) => application.status === "PENDING",
  ).length;

  const rejected = applications.filter(
    (application) => application.status === "REJECTED",
  ).length;

  res.status(200).json(
    new ApiResponse(200, "Dashboard loaded", {
      profile,
      stats: {
        availableJobs,
        applications: applications.length,
        accepted,
        pending,
        rejected,
      },
    }),
  );
});
