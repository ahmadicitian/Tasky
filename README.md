# **Task Management System - MERN Stack**  

A full-stack task management application built with **React (Frontend)** and **Express + MongoDB (Backend)**. Features include task listing, search, pagination, and deletion. Uses **TanStack Query (React Query)** for optimized data fetching.

---

## **📌 Table of Contents**  
1. [Features](#-features)  
2. [Tech Stack](#-tech-stack)  
3. [Setup & Installation](#-setup--installation)  
4. [Folder Structure](#-folder-structure)  
5. [API Endpoints](#-api-endpoints)  
6. [Frontend Details](#-frontend-details)  
7. [Error Handling & Validation](#-error-handling--validation) 

---

## **✨ Features**  
✅ **Task Listing** – View all tasks with pagination.  
✅ **Search** – Filter tasks by title or priority.  
✅ **Delete Tasks** – Remove tasks with confirmation.  
✅ **Optimized Data Fetching** – Uses **TanStack Query** for caching and performance.  
✅ **Responsive UI** – Works on mobile & desktop.  
✅ **Error Handling** – Proper validation and error responses.  

---

## **🛠 Tech Stack**  
| **Frontend** | **Backend** | **Database** |  
|-------------|------------|------------|  
| React | Express.js | MongoDB |  
| TanStack Query (React Query) | Joi (Validation) | Mongoose |  
| TailwindCSS | CORS |  |  
| SweetAlert2 (Alerts) |  |  |  

---

## **⚙ Setup & Installation**  

### **1. Backend Setup**  
```terminal
cd server  
npm install         # Install dependencies  
npm run test       # Seed sample tasks into MongoDB (TaskDB)  
npm run dev        # Start backend server (http://localhost:8080)  
```

### **2. Frontend Setup**  
```bash
cd client  
npm install         # Install dependencies  
npm run dev        # Start React app (http://localhost:5173)  
```

> **Note:**  
> - Backend must be running before frontend.  
> - MongoDB should be connected.

---

## **📂 Folder Structure**  
```
task-management/  
├── client/               # Frontend (React)  
│   ├── src/  
│   │   ├── components/   # Reusable UI components  
│   │   ├── services/     # API service functions  
│   │   ├── App.jsx       # Main app entry  
│   │   └── ...  
├── server/               # Backend (Express)  
│   ├── models/           # Mongoose schemas  
│   ├── routes/           # API endpoints
│   ├── controllers/      # End Point Logics
│   ├── middlewares/      # Error handling & validation  
│   ├── addTasks.js           # Test data seeder  
│   └── ...  
```

---

## **🌐 API Endpoints**  
| Method | Endpoint | Description |  
|--------|----------|-------------|  
| `GET` | `/api/v1/task` | Get all tasks (supports pagination & search) |  
| `GET` | `/api/v1/task/:id` | Get task by id |  
| `DELETE` | `/api/v1/task/:id` | Delete a task |  
| `POST` | `/api/v1/task` | Add a new task *(Not implemented in frontend)* |  
| `PUT` | `/api/v1/task/:id` | Update a task *(Not implemented in frontend)* |  

---

## **🖥 Frontend Details**  
### **Key Implementations**  
🔹 **TanStack Query** – Used for data fetching (caching, auto-retry, background updates).
🔹 **Pagination** – Built with `keepPreviousData` for smooth transitions.  
🔹 **SweetAlert2** – Confirmation dialogs for deletions.  

### **Components**  
- `TaskTable.jsx` – Main table with search, pagination, and delete.  
- Uses **TailwindCSS** for styling.  

---

## **⚠ Error Handling & Validation**  
### **Backend**  
✔ **Joi Validation** – Checks request data before processing.  
✔ **Custom Middlewares** – Handle errors and send structured responses.  
✔ **Try-Catch Blocks** – Prevents server crashes.  

### **Frontend**  
✔ **React Query Error States** – `isError` flag for API failures.  
✔ **User-Friendly Alerts** – SweetAlert2 for success/error messages.  

---

## **📜 License**  
MIT License © 2023 Ahmed Shah  

---

### **🎯 Future Improvements**  
🔸 Add task creation/update forms.  
🔸 User authentication (JWT). 

---

**🚀 Happy Coding!**  😊
