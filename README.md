# 🩸 BloodBridge – Smart Blood Bank Platform

BloodBridge is a full-stack web application designed to manage blood donors, blood inventory, and blood requests efficiently. It provides secure authentication, role-based access, real-time updates, and server-side rendered reporting.

---

# 🚀 Features

* 🔐 JWT Authentication & Session Management
* 👥 Role-Based Access Control (Admin / Staff)
* 🧑‍🤝‍🧑 Donor Management System
* 🩸 Blood Inventory Management
* 📩 Blood Request Handling
* 🔎 Blood Compatibility Matching
* ⚡ Real-Time Updates using Socket.IO
* 📄 SSR Report Page using EJS
* 📁 Donor Image Upload using Multer
* 🧪 API Testing using Jest & Supertest
* 🗄️ Prisma ORM Demo Integration
* 🖥️ Responsive React Frontend

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Vite

## Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Express Sessions
* Socket.IO
* EJS (SSR)

## Additional Tools

* Multer
* Jest
* Supertest
* Prisma ORM
* Postman
* Git & GitHub

---

# 📂 Project Structure

BloodBridge-Smart-Blood-Bank/

├── client/

├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── prisma/
│   ├── routes/
│   ├── tests/
│   ├── uploads/
│   ├── utils/
│   ├── views/
│   └── server.js

├── .gitignore
├── README.md
└── package.json

---

# ⚙️ Installation & Setup

## 1. Clone Repository

git clone https://github.com/your-username/BloodBridge-Smart-Blood-Bank.git

cd BloodBridge-Smart-Blood-Bank

---

## 2. Install Backend Dependencies

cd server

npm install

---

## 3. Configure Environment Variables

Create `.env` inside `server/`

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

SESSION_SECRET=your_session_secret

---

## 4. Run Backend

npm start

Backend runs on:

http://localhost:5000

---

## 5. Run Frontend

cd client

npm install

npm run dev

Frontend runs on:

http://localhost:3000

---

# 🔑 API Endpoints

## Authentication

* POST /api/auth/signup
* POST /api/auth/login

## Donors

* POST /api/donors
* GET /api/donors
* GET /api/donors/:id
* PUT /api/donors/:id
* DELETE /api/donors/:id

## Inventory

* GET /api/inventory
* PUT /api/inventory/:bloodGroup

## Requests

* POST /api/requests
* GET /api/requests
* PUT /api/requests/:id
* GET /api/requests/match/:id

---

# 📄 SSR Report

Server-side rendered report page:

http://localhost:5000/report

Implemented using:

* EJS
* Express SSR

---

# ⚡ Real-Time Features

Socket.IO is used for:

* Instant blood request updates
* Live dashboard synchronization

---

# 📁 File Uploads

Multer is used to:

* Upload donor profile images
* Store images in /uploads
* Save image paths in MongoDB

---

# 🧪 Testing

Automated API testing implemented using:

* Jest
* Supertest

Run tests:

npm test

---

# 🧠 Key Concepts Used

* MVC Architecture
* REST APIs
* Middleware
* JWT Authentication
* Session & Cookies
* Server-Side Rendering (SSR)
* Real-Time Communication
* File Upload Handling
* Automated API Testing

---

# ⭐ Future Improvements

* Cloudinary Integration
* Deployment on Render/Vercel
* Email Notifications
* Advanced Analytics Dashboard

---

## 🌐 Live Deployment

Frontend:
https://blood-bridge-smart-blood-git-e75eec-dishikas-projects-9aaad1d2.vercel.app

Backend API:
https://bloodbridge-backend-3mqw.onrender.com

---
# 📌 Conclusion

BloodBridge provides an efficient, secure, and real-time solution for managing blood bank operations using modern full-stack web technologies.
