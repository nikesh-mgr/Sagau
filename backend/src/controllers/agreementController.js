import Agreement from "../models/agreementSchema.js";
import Job from "../models/jobSchema.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// GET MY AGREEMENTS
export const getMyAgreements = asyncHandler(async (req, res) => {
  const agreements = await Agreement.find({
    $or: [
      {
        client: req.user._id,
      },
      {
        worker: req.user._id,
      },
    ],
  })
    .populate("client", "fullName email")
    .populate("worker", "fullName email")
    .populate("job", "title budget status")
    .sort({
      createdAt: -1,
    });

  res
    .status(200)
    .json(new ApiResponse(200, "Agreements fetched successfully", agreements));
});

// GET SINGLE AGREEMENT
export const getSingleAgreement = asyncHandler(async (req, res) => {
  const agreement = await Agreement.findById(req.params.agreementId)
    .populate("client", "fullName email")
    .populate("worker", "fullName email")
    .populate("job");

  if (!agreement) {
    throw new ApiError(404, "Agreement not found");
  }

  // SECURITY CHECK
  const isParticipant =
    agreement.client._id.toString() === req.user._id.toString() ||
    agreement.worker._id.toString() === req.user._id.toString();

  if (!isParticipant) {
    throw new ApiError(403, "Unauthorized access");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Agreement fetched successfully", agreement));
});

// UPDATE AGREEMENT STATUS
export const updateAgreementStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowedStatuses = ["COMPLETED", "CANCELLED"];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid agreement status");
  }

  const agreement = await Agreement.findById(req.params.agreementId);

  if (!agreement) {
    throw new ApiError(404, "Agreement not found");
  }

  // ONLY CLIENT CAN COMPLETE
  if (agreement.client.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only client can update agreement");
  }

  agreement.status = status;

  // COMPLETION DATE
  if (status === "COMPLETED") {
    agreement.completedAt = new Date();

    await Job.findByIdAndUpdate(agreement.job, {
      status: "COMPLETED",
    });
  }

  await agreement.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        `Agreement ${status.toLowerCase()} successfully`,
        agreement,
      ),
    );
});
