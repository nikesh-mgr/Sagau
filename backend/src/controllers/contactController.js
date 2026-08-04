import Contact from "../models/contactSchema.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const sendContactMessage = asyncHandler(async (req, res) => {
  const { fullName, email, subject, message } = req.body;

  const contact = await Contact.create({
    fullName,
    email,
    subject,
    message,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Message sent successfully", contact));
});
