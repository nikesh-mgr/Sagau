import Notification from "../models/notificationSchema.js";

const createNotification = async ({
  receiver,
  sender = null,
  type,
  message,
  relatedId = null,
}) => {
  await Notification.create({
    receiver,

    sender,

    type,

    message,

    relatedId,
  });
};

export default createNotification;
