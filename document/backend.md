# Backend Structure

backend/
│
├── src/
│
├── config/
├── routes/
├── controllers/
├── models/
├── services/
├── middleware/
├── utils/
├── validators/
│
├── app.js
└── server.js

---

# Route Structure

## Auth Routes

/api/v1/auth

## User Routes

/api/v1/users

## Worker Routes

/api/v1/workers

## Job Routes

/api/v1/jobs

## Application Routes

/api/v1/applications

## Agreement Routes

/api/v1/agreements

## Review Routes

/api/v1/reviews

## Verification Routes

/api/v1/verification

## Admin Routes

/ api/v1/admin

---

# Core Backend Layers

Request
↓
Route
↓
Middleware
↓
Controller
↓
Service
↓
Model
↓
MongoDB

---

# Important Middleware

## Authentication Middleware

- validates JWT

## Role Middleware

- protects routes by role

## Upload Middleware

- handles documents/images

## Error Middleware

- centralized error handling

---

# Backend Principles

- REST API architecture
- scalable modular structure
- secure authentication
- separation of concerns
- reusable services
