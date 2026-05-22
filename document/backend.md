7. Backend Architecture Overview
   Backend Stack
   Technologies
   Node.js
   Express.js
   MongoDB
   Mongoose
   JWT Authentication
   Backend Folder Structure
   backend/
   │
   ├── node_modules/
   ├── src/
   │
   ├── config/
   │ └── db.js
   │
   ├── controllers/
   │ ├── authController.js
   │ ├── clientController.js
   │ ├── workerController.js
   │ ├── jobController.js
   │ └── applicationController.js
   │
   ├── middleware/
   │ └── authMiddleware.js
   │
   ├── models/
   │ ├── userSchema.js
   │ ├── clientSchema.js
   │ ├── workerSchema.js
   │ ├── jobSchema.js
   │ └── applicationSchema.js
   │
   ├── routes/
   │ ├── authRoute.js
   │ ├── clientRoute.js
   │ ├── workerRoute.js
   │ ├── jobRoute.js
   │ └── applicationRoute.js
   │
   ├── utils/
   │ └── generateToken.js
   │
   ├── app.js
   ├── server.js
   │
   ├── .env
   ├── .gitignore
   ├── package.json
   └── package-lock.json

# backend Rest api

/api/auth/register
/api/auth/login
/api/auth/me
/api/auth/logout

/api/clients/create-profile
/api/clients/profile
/api/clients/jobs
/api/clients/hiring-history

/api/workers/create-profile
/api/workers/profile
/api/workers/upload-documents
/api/workers/applications
/api/workers/assigned-jobs

/api/jobs
/api/jobs/:jobId
/api/jobs/:jobId/status
/api/jobs/client/my-jobs
/api/jobs/search
/api/jobs/:jobId/select-worker/:workerId

/api/applications/:jobId
/api/applications/job/:jobId
/api/applications/my-applications
/api/applications/:applicationId

/api/agreements
/api/agreements/:agreementId
/api/agreements/:agreementId/status

/api/reviews/:agreementId
/api/reviews/worker/:workerId
/api/reviews/client/:clientId

/api/verification/request
/api/verification/status
/api/verification/:verificationId/approve

/api/admin/users
/api/admin/users/:userId/block
/api/admin/users/:userId
/api/admin/stats

/api/notifications
/api/notifications/:notificationId/read
