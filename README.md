# 📝 My First Kanban Task Board (React + PHP + MySQL)

Hello! 👋  
This is a simple **Kanban-style Task Management App** that I created while learning full-stack development.  
I used **React.js for frontend**, **PHP & MySQL for backend**, and hosted everything using **Vercel** and **shared hosting**.

I made this project to understand how frontend connects with backend using APIs, how authentication works using JWT, and how drag-and-drop works in React.

---

## 🔗 Live Links

- **Frontend:** [https://todo-frontend-eight-brown.vercel.app](https://todo-frontend-eight-brown.vercel.app)
- **Backend APIs:** [https://backend.cicowp-ca.com/api](https://backend.cicowp-ca.com/api)

You can try the live demo using the credentials below.

---

## 🧠 What I Learned from This Project

- Making protected routes with login/logout
- Calling PHP APIs from React using Axios
- How to use JWT token in frontend
- Basic drag-and-drop using `react-beautiful-dnd`
- Saving activity logs in MySQL and showing them in frontend

---

## 🔐 Test Login Credentials

```
Email: tushar@example.com
Password: 123456
```

---

## 🔨 Tech Stack

- **Frontend:** React.js, JavaScript, Axios
- **Backend:** PHP (Core PHP)
- **Database:** MySQL
- **Auth:** JWT Token Based
- **Hosting:** Vercel (Frontend) + Shared Hosting with CPanel (Backend)

---

## ✅ Features

- Login & Register
- Add/Edit tasks
- Drag and drop tasks between columns (Todo, InProgress, Done)
- Activity log tracking (locally + from MySQL)
- Protected routes and token handling
- Periodic real-time sync (polling every 10s)

---

## 🧰 How to Run Locally

### 1. Clone and Setup Frontend

```bash
git clone https://github.com/your-username/todo-frontend.git
cd todo-frontend
npm install
npm start
```

### 2. Backend Setup

- Place backend folder on your XAMPP/LAMP server or upload to shared hosting
- Import `todo_db.sql` into MySQL
- Update your `config.php` file with DB info
- Set API base path in React accordingly

---

## ❗ Notes

- **Smart Assign** feature is still under development
- **Real-time WebSocket sync** not added yet (currently using setInterval)
- Made this project fully myself (no templates used)

---

## 🧑‍💻 About Me

Hi, I’m **Tushar Modi**, a fresher web developer.  
I started with PHP and now learning full-stack using MERN. I love building things from scratch and learning while doing.  
You can connect with me on GitHub: [@tushar-GDM](https://github.com/tushar-GDM)

---

## 📃 License

Free to use and modify. If you find any bug, feel free to fix it 🙏