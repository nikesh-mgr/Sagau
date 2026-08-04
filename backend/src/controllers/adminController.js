import User from "../models/userSchema.js";
import Worker from "../models/workerSchema.js";
import Client from "../models/clientSchema.js";
import Job from "../models/jobSchema.js";
import Agreement from "../models/agreementSchema.js";
import Review from "../models/reviewSchema.js";
import Contact from "../models/contactSchema.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD
|--------------------------------------------------------------------------
*/

export const getDashboard = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalWorkers,
    totalClients,

    totalJobs,
    openJobs,
    inProgressJobs,
    completedJobs,
    closedJobs,

    totalAgreements,
    pendingAgreements,
    activeAgreements,
    completedAgreements,
    cancelledAgreements,

    totalReviews,
    totalMessages,
    unreadMessages,
  ] = await Promise.all([
    User.countDocuments(),

    Worker.countDocuments(),

    Client.countDocuments(),

    Job.countDocuments(),

    Job.countDocuments({ status: "OPEN" }),

    Job.countDocuments({ status: "IN_PROGRESS" }),

    Job.countDocuments({ status: "COMPLETED" }),

    Job.countDocuments({ status: "CLOSED" }),

    Agreement.countDocuments(),

    Agreement.countDocuments({ status: "PENDING" }),

    Agreement.countDocuments({ status: "ACTIVE" }),

    Agreement.countDocuments({ status: "COMPLETED" }),

    Agreement.countDocuments({ status: "CANCELLED" }),

    Review.countDocuments(),

    Contact.countDocuments(),

    Contact.countDocuments({ status: "UNREAD" }),
  ]);

  const recentUsers = await User.find()
    .select("fullName email role isActive createdAt")
    .sort({ createdAt: -1 })
    .limit(5);

  const recentJobs = await Job.find()
    .populate("client", "fullName email")
    .populate("selectedWorker", "fullName email")
    .sort({ createdAt: -1 })
    .limit(5);

  const recentAgreements = await Agreement.find()
    .populate("client", "fullName email")
    .populate("worker", "fullName email")
    .populate("job", "title")
    .sort({ createdAt: -1 })
    .limit(5);

  res.status(200).json(
    new ApiResponse(200, "Dashboard loaded successfully", {
      stats: {
        totalUsers,
        totalWorkers,
        totalClients,

        totalJobs,
        openJobs,
        inProgressJobs,
        completedJobs,
        closedJobs,

        totalAgreements,
        pendingAgreements,
        activeAgreements,
        completedAgreements,
        cancelledAgreements,

        totalReviews,

        totalMessages,
        unreadMessages,
      },

      recentUsers,
      recentJobs,
      recentAgreements,
    }),
  );
});

/*
|--------------------------------------------------------------------------
| USER CRUD
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| GET ALL USERS
|--------------------------------------------------------------------------
*/

export const getAllUsersByAdmin = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully", users));
});

/*
|--------------------------------------------------------------------------
| GET USER BY ID
|--------------------------------------------------------------------------
*/

export const getUserByIdByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
});

/*
|--------------------------------------------------------------------------
| UPDATE USER
|--------------------------------------------------------------------------
*/

export const updateUserByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.fullName = req.body.fullName ?? user.fullName;
  user.email = req.body.email ?? user.email;
  user.role = req.body.role ?? user.role;

  await user.save();

  res.status(200).json(new ApiResponse(200, "User updated successfully", user));
});

/*
|--------------------------------------------------------------------------
| TOGGLE USER STATUS
|--------------------------------------------------------------------------
*/

export const toggleUserStatusByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role === "admin") {
    throw new ApiError(400, "Admin account cannot be blocked");
  }

  user.isActive = !user.isActive;

  await user.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        `User ${user.isActive ? "activated" : "blocked"} successfully`,
        user,
      ),
    );
});

/*
|--------------------------------------------------------------------------
| DELETE USER
|--------------------------------------------------------------------------
*/

export const deleteUserByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role === "admin") {
    throw new ApiError(400, "Admin account cannot be deleted");
  }

  if (user.role === "worker") {
    await Worker.findOneAndDelete({ user: user._id });
  }

  if (user.role === "client") {
    await Client.findOneAndDelete({ user: user._id });
  }

  await Agreement.deleteMany({
    $or: [{ client: user._id }, { worker: user._id }],
  });

  await Review.deleteMany({
    $or: [{ client: user._id }, { worker: user._id }],
  });

  await User.findByIdAndDelete(user._id);

  res.status(200).json(new ApiResponse(200, "User deleted successfully"));
}); /*
|--------------------------------------------------------------------------
| WORKER CRUD
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| CREATE WORKER
|--------------------------------------------------------------------------
*/

export const createWorkerByAdmin = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    password,
    skills,
    bio,
    experience,
    hourlyRate,
    location,
    phone,
    availability,
    portfolio,
  } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    throw new ApiError(400, "Email already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    role: "worker",
  });

  const worker = await Worker.create({
    user: user._id,
    skills,
    bio,
    experience,
    hourlyRate,
    location,
    phone,
    availability: availability || "Available",
    portfolio: portfolio || "",
    profileImage: req.file ? req.file.filename : "",
  });

  const populatedWorker = await Worker.findById(worker._id).populate(
    "user",
    "-password",
  );

  res
    .status(201)
    .json(new ApiResponse(201, "Worker created successfully", populatedWorker));
});

/*
|--------------------------------------------------------------------------
| GET ALL WORKERS
|--------------------------------------------------------------------------
*/

export const getAllWorkersByAdmin = asyncHandler(async (req, res) => {
  const workers = await Worker.find()
    .populate("user", "-password")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, "Workers fetched successfully", workers));
});

/*
|--------------------------------------------------------------------------
| GET WORKER BY ID
|--------------------------------------------------------------------------
*/

export const getWorkerByIdByAdmin = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.workerId).populate(
    "user",
    "-password",
  );

  if (!worker) {
    throw new ApiError(404, "Worker not found");
  }

  const jobsCompleted = await Agreement.countDocuments({
    worker: worker.user._id,
    status: "COMPLETED",
  });

  const reviews = await Review.find({
    worker: worker.user._id,
  })
    .populate("client", "fullName")
    .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, "Worker fetched successfully", {
      worker,
      jobsCompleted,
      reviews,
    }),
  );
});

/*
|--------------------------------------------------------------------------
| UPDATE WORKER
|--------------------------------------------------------------------------
*/

export const updateWorkerByAdmin = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.workerId).populate("user");

  if (!worker) {
    throw new ApiError(404, "Worker not found");
  }

  if (req.body.fullName) worker.user.fullName = req.body.fullName;

  if (req.body.email) worker.user.email = req.body.email;

  worker.skills = req.body.skills ?? worker.skills;

  worker.bio = req.body.bio ?? worker.bio;

  worker.experience = req.body.experience ?? worker.experience;

  worker.hourlyRate = req.body.hourlyRate ?? worker.hourlyRate;

  worker.location = req.body.location ?? worker.location;

  worker.phone = req.body.phone ?? worker.phone;

  worker.availability = req.body.availability ?? worker.availability;

  worker.portfolio = req.body.portfolio ?? worker.portfolio;

  if (req.file) {
    worker.profileImage = req.file.filename;
  }

  await worker.user.save();

  await worker.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Worker updated successfully", worker));
});

/*
|--------------------------------------------------------------------------
| TOGGLE WORKER STATUS
|--------------------------------------------------------------------------
*/

export const toggleWorkerStatusByAdmin = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.workerId).populate("user");

  if (!worker) {
    throw new ApiError(404, "Worker not found");
  }

  worker.user.isActive = !worker.user.isActive;

  await worker.user.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        `Worker ${worker.user.isActive ? "activated" : "blocked"} successfully`,
        worker,
      ),
    );
});

/*
|--------------------------------------------------------------------------
| DELETE WORKER
|--------------------------------------------------------------------------
*/

export const deleteWorkerByAdmin = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.workerId);

  if (!worker) {
    throw new ApiError(404, "Worker not found");
  }

  await Agreement.deleteMany({
    worker: worker.user,
  });

  await Review.deleteMany({
    worker: worker.user,
  });

  await Worker.findByIdAndDelete(worker._id);

  await User.findByIdAndDelete(worker.user);

  res.status(200).json(new ApiResponse(200, "Worker deleted successfully"));
}); /*
|--------------------------------------------------------------------------
| CLIENT CRUD
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| CREATE CLIENT
|--------------------------------------------------------------------------
*/

export const createClientByAdmin = asyncHandler(async (req, res) => {
  const { fullName, email, password, phone, address } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    throw new ApiError(400, "Email already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    role: "client",
  });

  const client = await Client.create({
    user: user._id,
    phone,
    address,
    profileImage: req.file ? req.file.filename : "",
  });

  const populatedClient = await Client.findById(client._id).populate(
    "user",
    "-password",
  );

  res
    .status(201)
    .json(new ApiResponse(201, "Client created successfully", populatedClient));
});

/*
|--------------------------------------------------------------------------
| GET ALL CLIENTS
|--------------------------------------------------------------------------
*/

export const getAllClientsByAdmin = asyncHandler(async (req, res) => {
  const clients = await Client.find()
    .populate("user", "-password")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, "Clients fetched successfully", clients));
});

/*
|--------------------------------------------------------------------------
| GET CLIENT BY ID
|--------------------------------------------------------------------------
*/

export const getClientByIdByAdmin = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.clientId).populate(
    "user",
    "-password",
  );

  if (!client) {
    throw new ApiError(404, "Client not found");
  }

  const jobsPosted = await Job.countDocuments({
    client: client.user._id,
  });

  const completedJobs = await Agreement.countDocuments({
    client: client.user._id,
    status: "COMPLETED",
  });

  const reviews = await Review.find({
    client: client.user._id,
  })
    .populate("worker", "fullName")
    .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, "Client fetched successfully", {
      client,
      jobsPosted,
      completedJobs,
      reviews,
    }),
  );
});

/*
|--------------------------------------------------------------------------
| UPDATE CLIENT
|--------------------------------------------------------------------------
*/

export const updateClientByAdmin = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.clientId).populate("user");

  if (!client) {
    throw new ApiError(404, "Client not found");
  }

  if (req.body.fullName) {
    client.user.fullName = req.body.fullName;
  }

  if (req.body.email) {
    client.user.email = req.body.email;
  }

  client.phone = req.body.phone ?? client.phone;

  client.address = req.body.address ?? client.address;

  if (req.file) {
    client.profileImage = req.file.filename;
  }

  await client.user.save();

  await client.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Client updated successfully", client));
});

/*
|--------------------------------------------------------------------------
| TOGGLE CLIENT STATUS
|--------------------------------------------------------------------------
*/

export const toggleClientStatusByAdmin = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.clientId).populate("user");

  if (!client) {
    throw new ApiError(404, "Client not found");
  }

  client.user.isActive = !client.user.isActive;

  await client.user.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        `Client ${client.user.isActive ? "activated" : "blocked"} successfully`,
        client,
      ),
    );
});

/*
|--------------------------------------------------------------------------
| DELETE CLIENT
|--------------------------------------------------------------------------
*/

export const deleteClientByAdmin = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.clientId);

  if (!client) {
    throw new ApiError(404, "Client not found");
  }

  await Job.deleteMany({
    client: client.user,
  });

  await Agreement.deleteMany({
    client: client.user,
  });

  await Review.deleteMany({
    client: client.user,
  });

  await Client.findByIdAndDelete(client._id);

  await User.findByIdAndDelete(client.user);

  res.status(200).json(new ApiResponse(200, "Client deleted successfully"));
}); /*
|--------------------------------------------------------------------------
| JOB CRUD
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| CREATE JOB
|--------------------------------------------------------------------------
*/

export const createJobByAdmin = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    location,
    budget,
    deadline,
    client,
    status,
  } = req.body;

  const clientExists = await User.findById(client);

  if (!clientExists) {
    throw new ApiError(404, "Client not found");
  }

  const job = await Job.create({
    client,
    title,
    description,
    budget,
    location,
    category,
    deadline,
    status: status || "OPEN",
  });

  res.status(201).json(new ApiResponse(201, "Job created successfully", job));
});

/*
|--------------------------------------------------------------------------
| GET ALL JOBS
|--------------------------------------------------------------------------
*/

export const getAllJobsByAdmin = asyncHandler(async (req, res) => {
  const jobs = await Job.find()
    .populate("client", "fullName email")
    .populate("selectedWorker", "fullName email")
    .sort({ createdAt: -1 });

  const jobsWithAgreement = await Promise.all(
    jobs.map(async (job) => {
      const agreement = await Agreement.findOne({
        job: job._id,
      }).select("_id status");

      return {
        ...job.toObject(),
        agreement,
      };
    }),
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Jobs fetched successfully", jobsWithAgreement));
});

/*
|--------------------------------------------------------------------------
| GET SINGLE JOB
|--------------------------------------------------------------------------
*/

export const getJobByAdmin = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId)
    .populate("client", "-password")
    .populate("selectedWorker", "-password");

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  const agreement = await Agreement.findOne({
    job: job._id,
  })
    .populate("client", "-password")
    .populate("worker", "-password");

  const reviews = await Review.find({
    job: job._id,
  })
    .populate("client", "fullName")
    .populate("worker", "fullName");

  res.status(200).json(
    new ApiResponse(200, "Job fetched successfully", {
      job,
      agreement,
      reviews,
    }),
  );
});

/*
|--------------------------------------------------------------------------
| UPDATE JOB
|--------------------------------------------------------------------------
*/

export const updateJobByAdmin = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  job.title = req.body.title ?? job.title;
  job.description = req.body.description ?? job.description;
  job.category = req.body.category ?? job.category;
  job.location = req.body.location ?? job.location;
  job.budget = req.body.budget ?? job.budget;
  job.deadline = req.body.deadline ?? job.deadline;
  job.status = req.body.status ?? job.status;

  if (req.body.selectedWorker !== undefined) {
    job.selectedWorker = req.body.selectedWorker;
  }

  await job.save();

  res.status(200).json(new ApiResponse(200, "Job updated successfully", job));
});

/*
|--------------------------------------------------------------------------
| TOGGLE JOB STATUS
|--------------------------------------------------------------------------
*/

export const toggleJobStatusByAdmin = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  const nextStatus = {
    OPEN: "IN_PROGRESS",
    IN_PROGRESS: "COMPLETED",
    COMPLETED: "CLOSED",
    CLOSED: "OPEN",
    EXPIRED: "OPEN",
  };

  job.status = nextStatus[job.status] || "OPEN";

  await job.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Job status changed successfully", job));
});

/*
|--------------------------------------------------------------------------
| UPDATE JOB STATUS
|--------------------------------------------------------------------------
*/

export const updateJobStatusByAdmin = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowed = ["OPEN", "IN_PROGRESS", "COMPLETED", "CLOSED", "EXPIRED"];

  if (!allowed.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const job = await Job.findById(req.params.jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  job.status = status;

  await job.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Job status updated successfully", job));
});

/*
|--------------------------------------------------------------------------
| DELETE JOB
|--------------------------------------------------------------------------
*/

export const deleteJobByAdmin = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  await Agreement.deleteMany({
    job: job._id,
  });

  await Review.deleteMany({
    job: job._id,
  });

  await Job.findByIdAndDelete(job._id);

  res.status(200).json(new ApiResponse(200, "Job deleted successfully"));
});
/*
|--------------------------------------------------------------------------
| AGREEMENT CRUD
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| GET ALL AGREEMENTS
|--------------------------------------------------------------------------
*/

export const getAllAgreementsByAdmin = asyncHandler(async (req, res) => {
  const agreements = await Agreement.find()
    .populate("client", "fullName email")
    .populate("worker", "fullName email")
    .populate("job", "title category budget location status")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, "Agreements fetched successfully", agreements));
});

/*
|--------------------------------------------------------------------------
| GET SINGLE AGREEMENT
|--------------------------------------------------------------------------
*/
export const getAgreementByIdByAdmin = asyncHandler(async (req, res) => {
  const agreement = await Agreement.findById(req.params.agreementId)
    .populate("client", "fullName email role isActive createdAt")
    .populate("worker", "fullName email role isActive createdAt")
    .populate({
      path: "job",
      select:
        "title description category budget location deadline status selectedWorker client",
      populate: [
        {
          path: "client",
          select: "fullName email",
        },
        {
          path: "selectedWorker",
          select: "fullName email",
        },
      ],
    });

  if (!agreement) {
    return res.status(404).json(new ApiResponse(404, "Agreement not found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Agreement fetched successfully", agreement));
});
/*
|--------------------------------------------------------------------------
| UPDATE AGREEMENT
|--------------------------------------------------------------------------
*/

export const updateAgreementStatusByAdmin = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowedStatus = ["PENDING", "ACTIVE", "COMPLETED", "CANCELLED"];

  if (!allowedStatus.includes(status)) {
    throw new ApiError(400, "Invalid agreement status");
  }

  const agreement = await Agreement.findById(req.params.agreementId);

  if (!agreement) {
    throw new ApiError(404, "Agreement not found");
  }

  agreement.status = status;

  await agreement.save();

  // Sync Job Status

  const job = await Job.findById(agreement.job);

  if (job) {
    if (status === "ACTIVE") {
      job.status = "IN_PROGRESS";
    }

    if (status === "COMPLETED") {
      job.status = "COMPLETED";
    }

    if (status === "CANCELLED") {
      job.status = "OPEN";
      job.selectedWorker = null;
    }

    await job.save();
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Agreement updated successfully", agreement));
});

/*
|--------------------------------------------------------------------------
| TOGGLE AGREEMENT STATUS
|--------------------------------------------------------------------------
*/

export const toggleAgreementStatusByAdmin = asyncHandler(async (req, res) => {
  const agreement = await Agreement.findById(req.params.agreementId);

  if (!agreement) {
    throw new ApiError(404, "Agreement not found");
  }

  const flow = {
    PENDING: "ACTIVE",
    ACTIVE: "COMPLETED",
    COMPLETED: "CANCELLED",
    CANCELLED: "PENDING",
  };

  agreement.status = flow[agreement.status] || "PENDING";

  await agreement.save();

  const job = await Job.findById(agreement.job);

  if (job) {
    switch (agreement.status) {
      case "ACTIVE":
        job.status = "IN_PROGRESS";
        break;

      case "COMPLETED":
        job.status = "COMPLETED";
        break;

      case "CANCELLED":
        job.status = "OPEN";
        job.selectedWorker = null;
        break;
    }

    await job.save();
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Agreement status changed successfully", agreement),
    );
});

/*
|--------------------------------------------------------------------------
| DELETE AGREEMENT
|--------------------------------------------------------------------------
*/

export const deleteAgreementByAdmin = asyncHandler(async (req, res) => {
  const agreement = await Agreement.findById(req.params.agreementId);

  if (!agreement) {
    throw new ApiError(404, "Agreement not found");
  }

  await Review.deleteMany({
    agreement: agreement._id,
  });

  const job = await Job.findById(agreement.job);

  if (job) {
    job.status = "OPEN";
    job.selectedWorker = null;

    await job.save();
  }

  await Agreement.findByIdAndDelete(agreement._id);

  res.status(200).json(new ApiResponse(200, "Agreement deleted successfully"));
}); /*
|--------------------------------------------------------------------------
| REVIEW CRUD
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| GET ALL REVIEWS
|--------------------------------------------------------------------------
*/

export const getAllReviewsByAdmin = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate("client", "fullName email")
    .populate("worker", "fullName email")
    .populate("job", "title category")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, "Reviews fetched successfully", reviews));
});

/*
|--------------------------------------------------------------------------
| GET SINGLE REVIEW
|--------------------------------------------------------------------------
*/

export const getReviewByIdByAdmin = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.reviewId)
    .populate("client", "fullName email")
    .populate("worker", "fullName email")
    .populate("job", "title category location budget")
    .populate("agreement");

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Review fetched successfully", review));
});

/*
|--------------------------------------------------------------------------
| DELETE REVIEW
|--------------------------------------------------------------------------
*/

export const deleteReviewByAdmin = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.reviewId);

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  await Review.findByIdAndDelete(review._id);

  res.status(200).json(new ApiResponse(200, "Review deleted successfully"));
});

/*
|--------------------------------------------------------------------------
| CONTACT MESSAGE CRUD
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| GET ALL CONTACT MESSAGES
|--------------------------------------------------------------------------
*/

export const getAllContactMessages = asyncHandler(async (req, res) => {
  const messages = await Contact.find().sort({
    createdAt: -1,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Messages fetched successfully", messages));
});

/*
|--------------------------------------------------------------------------
| GET SINGLE CONTACT MESSAGE
|--------------------------------------------------------------------------
*/

export const getContactMessageById = asyncHandler(async (req, res) => {
  const message = await Contact.findById(req.params.messageId);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  if (message.status === "UNREAD") {
    message.status = "READ";
    await message.save();
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Message fetched successfully", message));
});

/*
|--------------------------------------------------------------------------
| MARK MESSAGE AS READ
|--------------------------------------------------------------------------
*/

export const markMessageAsRead = asyncHandler(async (req, res) => {
  const message = await Contact.findById(req.params.messageId);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  message.status = "READ";

  await message.save();

  res.status(200).json(new ApiResponse(200, "Message marked as read", message));
});

/*
|--------------------------------------------------------------------------
| MARK MESSAGE AS UNREAD
|--------------------------------------------------------------------------
*/

export const markMessageAsUnread = asyncHandler(async (req, res) => {
  const message = await Contact.findById(req.params.messageId);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  message.status = "UNREAD";

  await message.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Message marked as unread", message));
});

/*
|--------------------------------------------------------------------------
| DELETE CONTACT MESSAGE
|--------------------------------------------------------------------------
*/

export const deleteContactMessage = asyncHandler(async (req, res) => {
  const message = await Contact.findById(req.params.messageId);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  await Contact.findByIdAndDelete(message._id);

  res.status(200).json(new ApiResponse(200, "Message deleted successfully"));
});
