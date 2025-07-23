# 💼 Jobby - Your Job Search Companion

A full-stack web application designed to streamline the job search process. Users can browse job listings, apply for positions, manage their applications, and connect with potential employers. The backend is built using Node.js, Express, and MongoDB, while the frontend is built using React.js.

## 🚀 Live Demo

Frontend (Website): https://pavanijobby.netlify.app  
Backend API: https://jobby-41mg.onrender.com

## 📁 Project Structure

```
jobby-website/
├── backend/ # Node.js + Express.js + MongoDB (Mongoose)  
│ ├── models/ # Mongoose schemas (e.g., Job, User, Application)  
│ ├── routes/ # API route handlers  
│ ├── .env # Backend environment variables (MongoDB URI, JWT Secret)  
│ ├── app.js # App entry (express config)  
│ ├── server.js # Backend server  
│ └── package.json  
│
├── frontend/ # React frontend  
│ ├── src/ # React components, pages, context, etc.  
│ ├── .env # Frontend environment variable for API URL  
│ ├── public/  
│ ├── package.json  
│ └── build/ # Production build (ignored by Git)  
│
├── .gitignore  
├── README.md # Project documentation  

```

## 🛠 Technologies Used

### Backend

*   Node.js
*   Express.js
*   MongoDB (with Mongoose)
*   Render for deployment

### Frontend

*   React.js
*   React Router
*   Context API
*   Material-UI
*   Netlify for deployment

## 🌐 Environment Variables

### Backend `.env` (in `/backend`)

```
MONGODB_URI
JWT_SECRET
PORT
```


## 📚 Learnings

Through this project, I gained valuable hands-on experience in building and deploying a full-stack job search web application. I learned how to create a responsive frontend using React.js, manage dynamic routing with React Router, and fetch data efficiently using asynchronous functions. On the backend, I developed RESTful APIs using Node.js and Express, and connected them to a MongoDB database hosted on Atlas using Mongoose. I also understood the importance of environment variables and how to manage them securely in `.env` files while avoiding exposure in version control using `.gitignore`. Deploying the backend on render and the frontend on netlify taught me how to connect multiple platforms, handle build errors, whitelist IPs, and configure environment variables for production. This project not only helped me improve my coding and debugging skills but also gave me the confidence to take on more advanced full-stack projects in the future.

## 🙋‍♀️ Author

Pavani Punuru

📧 punurupavani7@gmail.com





