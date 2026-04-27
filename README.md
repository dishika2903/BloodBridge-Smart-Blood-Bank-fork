# 🩸 BloodBridge – Smart Blood Bank Platform

BloodBridge is a full-stack web application designed to manage blood donors, inventory, and blood requests efficiently. It provides role-based access (Admin & Staff), secure authentication, and real-time data handling.

---

## 🚀 Features

- 🔐 User Authentication (Signup/Login with JWT + Sessions)
- 👥 Role-Based Access Control (Admin / Staff)
- 🧑‍🤝‍🧑 Donor Management (Add, View, Update, Delete)
- 🩸 Blood Inventory Management
- 📩 Blood Request Handling
- 🔎 Blood Compatibility Matching
- 🖥️ Frontend built with React
- ⚙️ Backend built with Node.js & Express
- 🗄️ MongoDB Database Integration
- 📄 EJS Template Rendering (for demo)
- 🧪 API Testing using Postman

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- React Router DOM
- Vite

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Express Sessions
- EJS

### Tools:
- Postman
- Git & GitHub

---

## 📂 Project Structure

BloodBridge-Smart-Blood-Bank/
│
├── client/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── views/
│   └── server.js
│
├── .env
├── package.json
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

git clone https://github.com/your-username/BloodBridge-Smart-Blood-Bank.git  
cd BloodBridge-Smart-Blood-Bank

---

### 2. Install Backend Dependencies

cd server  
npm install

---

### 3. Setup Environment Variables

Create `.env` inside `server/`:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
SESSION_SECRET=your_session_secret  

---

### 4. Run Backend

npm start  

Server runs at:  
http://localhost:5000

---

### 5. Run Frontend

cd client  
npm install  
npm run dev  

Frontend runs at:  
http://localhost:3000

---

## 🔑 API Endpoints

### Auth
POST /api/auth/signup  
POST /api/auth/login  

### Donors
POST /api/donors  
GET /api/donors  
GET /api/donors/:id  
PUT /api/donors/:id  
DELETE /api/donors/:id  

### Inventory
GET /api/inventory  
PUT /api/inventory/update/bloodGroup  

### Requests
POST /api/requests  
GET /api/requests  
PUT /api/requests/status/:id  
GET /api/requests/match/:id  

---

## 🧪 Testing

Use Postman to test APIs.

Session check:
GET /session-check  

---

## 🧠 Key Concepts

- MVC Architecture  
- Middleware  
- REST APIs  
- JWT Authentication  
- Session Management  
- MongoDB  

---

## 📸 Screenshots

(Add screenshots here)
- Signup API  
- Login API  
- Session Check  
- MongoDB Data  
- Frontend UI  

---


## ⭐ Future Improvements

- Real-time updates  
- Admin dashboard  
- Deployment  

---

## 📌 Conclusion
BloodBridge provides an efficient system for managing blood bank operations using modern web technologies.

---
BloodBridge provides an efficient system for managing blood bank operations using modern web technologies.

---
