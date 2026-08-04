import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { uploadProfile } from "../middleware/multerMidddleware.js";

import {
  // ==========================
  // Dashboard
  // ==========================
  getDashboard,

  // ==========================
  // Users
  // ==========================
  getAllUsersByAdmin,
  getUserByIdByAdmin,
  updateUserByAdmin,
  toggleUserStatusByAdmin,
  deleteUserByAdmin,

  // ==========================
  // Workers
  // ==========================
  createWorkerByAdmin,
  getAllWorkersByAdmin,
  getWorkerByIdByAdmin,
  updateWorkerByAdmin,
  toggleWorkerStatusByAdmin,
  deleteWorkerByAdmin,

  // ==========================
  // Clients
  // ==========================
  createClientByAdmin,
  getAllClientsByAdmin,
  getClientByIdByAdmin,
  updateClientByAdmin,
  toggleClientStatusByAdmin,
  deleteClientByAdmin,

  // ==========================
  // Jobs
  // ==========================
  createJobByAdmin,
  getAllJobsByAdmin,
  getJobByAdmin,
  updateJobByAdmin,
  toggleJobStatusByAdmin,
  updateJobStatusByAdmin,
  deleteJobByAdmin,

  // ==========================
  // Agreements
  // ==========================
  getAllAgreementsByAdmin,
  getAgreementByIdByAdmin,
  updateAgreementStatusByAdmin,
  toggleAgreementStatusByAdmin,
  deleteAgreementByAdmin,

  // ==========================
  // Reviews
  // ==========================
  getAllReviewsByAdmin,
  getReviewByIdByAdmin,
  deleteReviewByAdmin,

  // ==========================
  // Contact Messages
  // ==========================
  getAllContactMessages,
  getContactMessageById,
  markMessageAsRead,
  markMessageAsUnread,
  deleteContactMessage,
} from "../controllers/adminController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

router.get("/dashboard", protect, authorizeRoles("admin"), getDashboard);

/*
|--------------------------------------------------------------------------
| USERS
|--------------------------------------------------------------------------
*/

router.get("/users", protect, authorizeRoles("admin"), getAllUsersByAdmin);

router.get(
  "/users/:userId",
  protect,
  authorizeRoles("admin"),
  getUserByIdByAdmin,
);

router.put(
  "/users/:userId",
  protect,
  authorizeRoles("admin"),
  updateUserByAdmin,
);

router.patch(
  "/users/:userId/toggle",
  protect,
  authorizeRoles("admin"),
  toggleUserStatusByAdmin,
);

router.delete(
  "/users/:userId",
  protect,
  authorizeRoles("admin"),
  deleteUserByAdmin,
);

/*
|--------------------------------------------------------------------------
| WORKERS
|--------------------------------------------------------------------------
*/

router.post(
  "/workers",
  protect,
  authorizeRoles("admin"),
  uploadProfile.single("profileImage"),
  createWorkerByAdmin,
);

router.get("/workers", protect, authorizeRoles("admin"), getAllWorkersByAdmin);

router.get(
  "/workers/:workerId",
  protect,
  authorizeRoles("admin"),
  getWorkerByIdByAdmin,
);

router.put(
  "/workers/:workerId",
  protect,
  authorizeRoles("admin"),
  uploadProfile.single("profileImage"),
  updateWorkerByAdmin,
);

router.patch(
  "/workers/:workerId/toggle",
  protect,
  authorizeRoles("admin"),
  toggleWorkerStatusByAdmin,
);

router.delete(
  "/workers/:workerId",
  protect,
  authorizeRoles("admin"),
  deleteWorkerByAdmin,
);

/*
|--------------------------------------------------------------------------
| CLIENTS
|--------------------------------------------------------------------------
*/

router.post(
  "/clients",
  protect,
  authorizeRoles("admin"),
  uploadProfile.single("profileImage"),
  createClientByAdmin,
);

router.get("/clients", protect, authorizeRoles("admin"), getAllClientsByAdmin);

router.get(
  "/clients/:clientId",
  protect,
  authorizeRoles("admin"),
  getClientByIdByAdmin,
);

router.put(
  "/clients/:clientId",
  protect,
  authorizeRoles("admin"),
  uploadProfile.single("profileImage"),
  updateClientByAdmin,
);

router.patch(
  "/clients/:clientId/toggle",
  protect,
  authorizeRoles("admin"),
  toggleClientStatusByAdmin,
);

router.delete(
  "/clients/:clientId",
  protect,
  authorizeRoles("admin"),
  deleteClientByAdmin,
);

/*
|--------------------------------------------------------------------------
| JOBS
|--------------------------------------------------------------------------
*/

router.post("/jobs", protect, authorizeRoles("admin"), createJobByAdmin);

router.get("/jobs", protect, authorizeRoles("admin"), getAllJobsByAdmin);

router.get("/jobs/:jobId", protect, authorizeRoles("admin"), getJobByAdmin);

router.put("/jobs/:jobId", protect, authorizeRoles("admin"), updateJobByAdmin);

router.patch(
  "/jobs/:jobId/toggle",
  protect,
  authorizeRoles("admin"),
  toggleJobStatusByAdmin,
);

router.patch(
  "/jobs/:jobId/status",
  protect,
  authorizeRoles("admin"),
  updateJobStatusByAdmin,
);

router.delete(
  "/jobs/:jobId",
  protect,
  authorizeRoles("admin"),
  deleteJobByAdmin,
);

/*
|--------------------------------------------------------------------------
| AGREEMENTS
|--------------------------------------------------------------------------
*/

router.get(
  "/agreements",
  protect,
  authorizeRoles("admin"),
  getAllAgreementsByAdmin,
);

router.get(
  "/agreements/:agreementId",
  protect,
  authorizeRoles("admin"),
  getAgreementByIdByAdmin,
);

router.patch(
  "/agreements/:agreementId/status",
  protect,
  authorizeRoles("admin"),
  updateAgreementStatusByAdmin,
);

router.patch(
  "/agreements/:agreementId/toggle",
  protect,
  authorizeRoles("admin"),
  toggleAgreementStatusByAdmin,
);

router.delete(
  "/agreements/:agreementId",
  protect,
  authorizeRoles("admin"),
  deleteAgreementByAdmin,
);

/*
|--------------------------------------------------------------------------
| REVIEWS
|--------------------------------------------------------------------------
*/

router.get("/reviews", protect, authorizeRoles("admin"), getAllReviewsByAdmin);

router.get(
  "/reviews/:reviewId",
  protect,
  authorizeRoles("admin"),
  getReviewByIdByAdmin,
);

router.delete(
  "/reviews/:reviewId",
  protect,
  authorizeRoles("admin"),
  deleteReviewByAdmin,
);

/*
|--------------------------------------------------------------------------
| CONTACT MESSAGES
|--------------------------------------------------------------------------
*/

// Get all messages

router.get(
  "/messages",
  protect,
  authorizeRoles("admin"),
  getAllContactMessages,
);

// Get single message

router.get(
  "/messages/:messageId",
  protect,
  authorizeRoles("admin"),
  getContactMessageById,
);

// Mark message as read

router.patch(
  "/messages/:messageId/read",
  protect,
  authorizeRoles("admin"),
  markMessageAsRead,
);

// Mark message as unread

router.patch(
  "/messages/:messageId/unread",
  protect,
  authorizeRoles("admin"),
  markMessageAsUnread,
);

// Delete message

router.delete(
  "/messages/:messageId",
  protect,
  authorizeRoles("admin"),
  deleteContactMessage,
);

export default router;
