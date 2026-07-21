import Notification from "../models/notificationSchema.js";

import asyncHandler from "../utils/asyncHandler.js";

import ApiResponse from "../utils/ApiResponse.js";

import ApiError from "../utils/ApiError.js";

// Get my notifications

export const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    receiver: req.user._id,
  })

    .populate("sender", "fullName")

    .sort({
      createdAt: -1,
    });

  res.status(200).json(
    new ApiResponse(
      200,

      "Notifications fetched",

      notifications,
    ),
  );
});

// Mark notification as read

export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  if (notification.receiver.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  notification.isRead = true;

  await notification.save();

  res.status(200).json(
    new ApiResponse(
      200,

      "Notification updated",

      notification,
    ),
  );
});
