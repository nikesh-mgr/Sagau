import Agreement from "../models/agreementSchema.js";
import Job from "../models/jobSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import createNotification from "../utils/createNotification.js";

// ======================================================
// Get My Agreements
// ======================================================

export const getMyAgreements = asyncHandler(async (req, res) => {
  const agreements = await Agreement.find({
    $or: [{ client: req.user._id }, { worker: req.user._id }],
  })
    .populate("client", "fullName email role")
    .populate("worker", "fullName email role")
    .populate({
      path: "job",
      populate: {
        path: "client",
        select: "fullName email",
      },
    })
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, "Agreements fetched successfully", agreements));
});

// ======================================================
// Get Single Agreement
// ======================================================

export const getSingleAgreement = asyncHandler(async (req, res) => {
  const agreement = await Agreement.findById(req.params.agreementId)
    .populate("client", "fullName email role")
    .populate("worker", "fullName email role")
    .populate({
      path: "job",
      populate: {
        path: "client",
        select: "fullName email",
      },
    });

  if (!agreement) {
    throw new ApiError(404, "Agreement not found");
  }

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

// ======================================================
// Worker marks complete / Client approves
// ======================================================

export const updateAgreementStatus = asyncHandler(async (req, res) => {
  const agreement = await Agreement.findById(req.params.agreementId);

  if (!agreement) {
    throw new ApiError(404, "Agreement not found");
  }

  const isWorker = agreement.worker.toString() === req.user._id.toString();

  const isClient = agreement.client.toString() === req.user._id.toString();

  if (!isWorker && !isClient) {
    throw new ApiError(403, "Unauthorized");
  }

  if (agreement.status === "COMPLETED") {
    throw new ApiError(400, "Agreement already completed");
  }

  if (agreement.status === "CANCELLED") {
    throw new ApiError(400, "Agreement has been cancelled");
  }

  if (agreement.status !== "ACTIVE") {
    throw new ApiError(400, "Only active agreements can be updated");
  }

  // ======================================================
  // Worker submits completed work
  // ======================================================

  if (isWorker) {
    if (agreement.workerCompleted) {
      throw new ApiError(400, "You have already marked this work completed");
    }

    agreement.workerCompleted = true;

    agreement.workerCompletedAt = new Date();

    await createNotification({
      receiver: agreement.client,
      sender: agreement.worker,
      type: "WORK_SUBMITTED",
      message: `${req.user.fullName} submitted the completed work for your approval.`,
      relatedId: agreement._id,
    });
  }

  // ======================================================
  // Client approves work
  // ======================================================

  if (isClient) {
    if (!agreement.workerCompleted) {
      throw new ApiError(400, "Worker must complete the work before approval.");
    }

    if (agreement.clientCompleted) {
      throw new ApiError(400, "You have already approved this agreement");
    }

    agreement.clientCompleted = true;

    agreement.clientCompletedAt = new Date();

    await createNotification({
      receiver: agreement.worker,
      sender: agreement.client,
      type: "WORK_APPROVED",
      message: `${req.user.fullName} approved your completed work.`,
      relatedId: agreement._id,
    });
  }

  // ======================================================
  // Agreement Finished
  // ======================================================

  if (agreement.workerCompleted && agreement.clientCompleted) {
    agreement.status = "COMPLETED";

    agreement.completedAt = new Date();

    await Job.findByIdAndUpdate(
      agreement.job,
      {
        status: "COMPLETED",
      },
      {
        new: true,
      },
    );

    await createNotification({
      receiver: agreement.worker,
      sender: agreement.client,
      type: "AGREEMENT_COMPLETED",
      message: "Agreement completed successfully.",
      relatedId: agreement._id,
    });

    await createNotification({
      receiver: agreement.client,
      sender: agreement.worker,
      type: "AGREEMENT_COMPLETED",
      message: "Agreement completed successfully.",
      relatedId: agreement._id,
    });
  }

  await agreement.save();

  const updatedAgreement = await Agreement.findById(agreement._id)
    .populate("client", "fullName email role")
    .populate("worker", "fullName email role")
    .populate({
      path: "job",
      populate: {
        path: "client",
        select: "fullName email",
      },
    });

  res
    .status(200)
    .json(
      new ApiResponse(200, "Agreement updated successfully", updatedAgreement),
    );
});
