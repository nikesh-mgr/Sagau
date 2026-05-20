# Backend Structure

backend/
-node_modules
-src
--config
---db.js
--controllers
---clientController.js
---authController.js
---workerController.js
--middleware
---authMiddleware.js
--models
---userSchema.js
---workerSchema.js
---clientSchema.js
--routes
---authRoute.js
---workerRoute.js
---clientRoute.js
--utils
---generateToken.js
--app.js
--server.js
-.env
-.gitignore
-package-lock.json
-package.json

---

# Route Structure

## Auth Routes

/api/v1/auth

## client Routes

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
