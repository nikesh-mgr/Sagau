📘 SAGAU — Frontend & Backend Integration Documentation
📌 Project Name

Sagau — Freelance + Local Skilled Worker Marketplace

🧠 1. Overview

Sagau is a full-stack marketplace platform connecting:

👨‍💼 Clients (who post jobs)
🧑‍🔧 Workers (who apply for jobs)
🛡️ Admin (platform management)
Architecture:
Frontend (React + Vite)
↓
Axios API Layer
↓
Backend (Node.js + Express)
↓
MongoDB Database
🌐 2. Backend Base URL
Development
http://localhost:5000/api
Production
https://your-domain.com/api
🔐 3. Authentication Flow
3.1 Register User
Endpoint:
POST /api/auth/register
Request Body:
{
"fullName": "John Doe",
"email": "john@example.com",
"password": "123456",
"role": "client"
}
Response:
{
"success": true,
"message": "User registered successfully",
"data": {
"token": "JWT_TOKEN"
}
}
3.2 Login User
POST /api/auth/login
Request:
{
"email": "john@example.com",
"password": "123456"
}
Response:
{
"success": true,
"data": {
"token": "JWT_TOKEN"
}
}
3.3 Get Current User
GET /api/auth/me
Headers:
Authorization: Bearer JWT_TOKEN
🧭 4. Frontend Authentication Flow
Step Flow:
Login/Register → Receive JWT → Store in localStorage → Attach to Axios → Access Protected Routes
4.1 Token Storage (Frontend)
localStorage.setItem("token", token);
4.2 Axios Auto Token Injection
api.interceptors.request.use((config) => {
const token = localStorage.getItem("token");

if (token) {
config.headers.Authorization = `Bearer ${token}`;
}

return config;
});
🧑‍💼 5. Client APIs
Create Profile
POST /api/clients/create-profile
Get Profile
GET /api/clients/profile
Get Client Jobs
GET /api/clients/jobs
🧑‍🔧 6. Worker APIs
Create Profile
POST /api/workers/create-profile
Get Worker Profile
GET /api/workers/profile
Get All Workers
GET /api/workers
Get Worker Details
GET /api/workers/:id
💼 7. Job APIs
Create Job
POST /api/jobs
Get All Jobs
GET /api/jobs
Search Jobs
GET /api/jobs/search
Get Job Details
GET /api/jobs/:jobId
Select Worker
POST /api/jobs/:jobId/select-worker/:workerId
📩 8. Application System
Apply to Job
POST /api/applications/:jobId
Get My Applications
GET /api/applications/my-applications
Get Job Applications
GET /api/applications/job/:jobId
Update Application Status
PATCH /api/applications/:applicationId
🤝 9. Agreement System
Get Agreements
GET /api/agreements
Get Single Agreement
GET /api/agreements/:agreementId
Update Status
PATCH /api/agreements/:agreementId/status
⭐ 10. Review System (Frontend Integration)
Create Review
POST /api/reviews/:agreementId
Body:
{
"rating": 5,
"comment": "Excellent work"
}
Get Worker Reviews
GET /api/reviews/worker/:workerId
Get Client Reviews
GET /api/reviews/client/:clientId
🧩 11. Frontend API Layer Structure
src/api/
└── axios.js
Example API call:
import api from "../api/axios";

export const getWorkers = () => api.get("/workers");

export const loginUser = (data) =>
api.post("/auth/login", data);
🧠 12. Frontend State Management (Zustand)
src/store/authStore.js
Example:
const useAuthStore = create((set) => ({
user: null,
token: null,

setUser: (user) => set({ user }),

setToken: (token) => set({ token }),

logout: () => set({ user: null, token: null }),
}));
🔐 13. Protected Route Flow
User Login → Token Saved → Route Guard Checks Token → Access Granted
Logic:
if (!token) {
redirect("/login");
}
🎯 14. UI ↔ API Mapping
Worker Page
UI Component → GET /api/workers
Worker Profile Page
UI → GET /api/workers/:id + GET /api/reviews/worker/:id
Job Page
UI → GET /api/jobs
Job Details
UI → GET /api/jobs/:id + GET /api/applications/job/:id
Review Section
UI → POST /api/reviews/:agreementId
🚀 15. Data Flow Architecture
USER ACTION
↓
React Component
↓
Axios API Call
↓
Express Route
↓
Controller Logic
↓
MongoDB
↓
Response
↓
Frontend UI Update
⚠️ 16. Common Integration Rules
MUST FOLLOW:
Always use JWT in headers
Always use /api prefix
Never call DB directly from frontend
Validate backend responses
Use async/await for API calls
📌 17. Environment Variables
Frontend (.env)
VITE_API_BASE_URL=http://localhost:5000/api
Backend (.env)
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
PORT=5000
🧪 18. Testing Flow
Step-by-step:

1. Register user
2. Login user
3. Create profile (client/worker)
4. Create job
5. Worker applies
6. Client selects worker
7. Agreement created
8. Review submitted
   🏁 FINAL SUMMARY

Sagau frontend-backend system is built on:

REST API architecture
JWT authentication
Role-based access
Modular MVC backend
Feature-based React frontend
Axios communication layer
Zustand state management
🚀 Next Phase Recommendation

After this integration:

👉 Build Frontend in order:

Auth UI (Login/Register)
Worker Listing Page
Job Listing Page
Job Details Page
Application System UI
Agreement UI
Review System UI (final phase)
