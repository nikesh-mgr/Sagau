import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      default: null,
    },

    type: {
      type: String,

      enum: [
        "APPLICATION_RECEIVED",

        "APPLICATION_ACCEPTED",

        "APPLICATION_REJECTED",

        "AGREEMENT_CREATED",

        "AGREEMENT_COMPLETED",

        "NEW_REVIEW",
      ],

      required: true,
    },

    message: {
      type: String,

      required: true,
    },

    relatedId: {
      type: mongoose.Schema.Types.ObjectId,

      default: null,
    },

    isRead: {
      type: Boolean,

      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
