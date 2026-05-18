# schema structure

backend/src/models/
│
├── User.model.js
├── WorkerProfile.model.js
├── Job.model.js
├── Application.model.js
├── Agreement.model.js
├── Review.model.js
├── Verification.model.js
└── Notification.model.js // future

# user schema

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
trim: true
},

    email: {
      type: String,
      unique: true,
      sparse: true
    },

    phone: {
      type: String,
      unique: true,
      sparse: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["client", "worker", "admin"],
      default: "client"
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    verifiedBadge: {
      type: Boolean,
      default: false
    },

    trustScore: {
      type: Number,
      default: 0
    },

    averageRating: {
      type: Number,
      default: 0
    },

    totalReviews: {
      type: Number,
      default: 0
    },

    completedJobs: {
      type: Number,
      default: 0
    },

    location: {
      city: String,
      area: String
    },

    profileImage: {
      type: String
    },

    isSuspended: {
      type: Boolean,
      default: false
    }

},
{ timestamps: true }
);

export default mongoose.model("User", userSchema)

# workProfile

import mongoose from "mongoose";

const workerProfileSchema = new mongoose.Schema(
{
userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true
},

    bio: {
      type: String,
      maxlength: 1000
    },

    skills: [
      {
        type: String
      }
    ],

    categories: [
      {
        type: String
      }
    ],

    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "expert"],
      default: "beginner"
    },

    portfolio: [
      {
        title: String,
        description: String,
        imageUrl: String,
        projectUrl: String
      }
    ],

    pricing: {
      type: {
        type: String,
        enum: ["fixed", "hourly"]
      },

      amount: Number
    },

    availability: {
      type: String,
      enum: ["available", "busy", "offline"],
      default: "available"
    },

    documents: [
      {
        type: {
          type: String,
          enum: ["citizenship", "certificate", "resume"]
        },

        fileUrl: String,

        verified: {
          type: Boolean,
          default: false
        }
      }
    ]

},
{ timestamps: true }
);

export default mongoose.model(
"WorkerProfile",
workerProfileSchema
);

# job

import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
{
clientId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true
},

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    location: {
      city: String,
      area: String
    },

    budget: {
      type: Number
    },

    deadline: {
      type: Date
    },

    status: {
      type: String,
      enum: [
        "open",
        "assigned",
        "accepted",
        "in-progress",
        "completed",
        "cancelled"
      ],
      default: "open"
    },

    selectedWorker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

},
{ timestamps: true }
);

export default mongoose.model("Job", jobSchema);

# agreement

import mongoose from "mongoose";

const agreementSchema = new mongoose.Schema(
{
jobId: {
type: mongoose.Schema.Types.ObjectId,
ref: "Job",
required: true
},

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    finalPrice: {
      type: Number,
      required: true
    },

    agreedDeadline: {
      type: Date,
      required: true
    },

    clientConfirmed: {
      type: Boolean,
      default: false
    },

    workerConfirmed: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: [
        "pending",
        "active",
        "completed",
        "cancelled"
      ],
      default: "pending"
    }

},
{ timestamps: true }
);

export default mongoose.model(
"Agreement",
agreementSchema
);

# review

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
{
jobId: {
type: mongoose.Schema.Types.ObjectId,
ref: "Job",
required: true
},

    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    revieweeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },

    comment: {
      type: String,
      maxlength: 1000
    }

},
{ timestamps: true }
);

export default mongoose.model("Review", reviewSchema);

# verification

import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
{
userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true
},

    documentType: {
      type: String,
      enum: [
        "citizenship",
        "certificate",
        "resume"
      ]
    },

    documentUrl: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected"
      ],
      default: "pending"
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    reviewedAt: {
      type: Date
    }

},
{ timestamps: true }
);

export default mongoose.model(
"Verification",
verificationSchema
);

# notification

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
{
userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},

    title: String,

    message: String,

    type: {
      type: String,
      enum: [
        "application",
        "review",
        "verification",
        "system"
      ]
    },

    isRead: {
      type: Boolean,
      default: false
    }

},
{ timestamps: true }
);

export default mongoose.model(
"Notification",
notificationSchema
);
