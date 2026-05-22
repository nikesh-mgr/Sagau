import Review from "../models/reviewSchema.js";
import Job from "../models/jobSchema.js";

/**
 * CREATE REVIEW
 * Only allowed after job is COMPLETED
 */
export const createReview = async (req, res) => {
  try {
    const { jobId, rating, comment } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // only allow review if job is completed
    if (job.status !== "COMPLETED") {
      return res.status(400).json({
        message: "Job must be completed before review",
      });
    }

    // prevent duplicate review by same user
    const existing = await Review.findOne({
      job: jobId,
      reviewer: req.user._id,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already reviewed this job",
      });
    }

    const review = await Review.create({
      job: jobId,
      reviewer: req.user._id,
      reviewee: req.user.role === "client" ? job.selectedWorker : job.client,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getUserReviews = async (req, res) => {
  try {
    const userId = req.params.userId;

    const reviews = await Review.find({ reviewee: userId })
      .populate("reviewer", "fullName role")
      .sort({ createdAt: -1 });

    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

    res.json({
      success: true,
      totalReviews: reviews.length,
      averageRating: avgRating.toFixed(1),
      reviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
