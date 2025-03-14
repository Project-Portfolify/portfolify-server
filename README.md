# Portfolify Server

This is the **backend** for the **Portfolify** project, a web application that allows users to create and manage their professional portfolios. The backend handles authentication, user data management, portfolio CRUD operations, and other core functionalities.

🔗 Live Demo: [Portfolify](https://portfolify-project.netlify.app/) 

🔗 Live API: [Portfolify API](https://portfolify-server.onrender.com)

🔗 Front End Repo: [Click](https://github.com/Project-Portfolify/portfolify-client)


## 🚀 Features

- ✅ **User Authentication** (JWT-based login and signup)
- ✅ **Portfolio Management** (Create, update, delete portfolio sections)
- ✅ **Slug Generation** (Custom and unique URLs for each portfolio)
- ✅ **Database Management** (MongoDB for data storage)
- ✅ **Secure API** with request validation and error handling



## 🛠 Tech Stack

- **Node.js** - JavaScript runtime for backend operations
- **Express.js** - Lightweight web framework for API routing
- **MongoDB** - NoSQL database for storing user and portfolio data
- **Mongoose** - ODM library for MongoDB interactions
- **JWT (JSON Web Token)** - Secure authentication system
- **bcrypt.js** - Password hashing for secure storage
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing for API access control


## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```bash
# Clone the repository
git clone https://github.com/yourusername/portfolify-server.git
cd portfolify-server
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:3000
```

### 4️⃣ Run the Server
```bash
npm start
# Server runs on http://localhost:5000
```


## 📡 API Endpoints

### 🔑 Authentication

| Method | Endpoint            | Description          |
|--------|--------------------|----------------------|
| POST   | /api/auth/signup   | Register a new user |
| POST   | /api/auth/login    | Authenticate a user |

### 📂 Portfolio Management

 | Method | Endpoint                  | Description             |
 |--------|--------------------------|-------------------------|
 | GET    | /portfolios | Fetch user portfolios   |
 | GET    | /portfolios/:slug | Fetch single portfolio   |
 | PUT    | /portfolios/:slug | Update a portfolio   |
 | POST   | /portfolios           | Create portfolio |
 | DELETE | /portfolios/portfolioId       | Delete portfolio entry  |

## 🚀 Deployment

1️⃣ Push your code to GitHub:  
git add .  
git commit -m "Deploying to Render"  
git push origin main  

2️⃣ Go to **https://render.com**  
- Click **New Web Service**  
- Connect your GitHub repository  
- Select your branch (main)  

3️⃣ Set up the build:  
- Runtime: **Node.js**  
- Build Command: **npm install**  
- Start Command: **npm start**  

4️⃣ Add environment variables in **Settings**  

5️⃣ Click **Deploy** 🚀 

## 📜 License
This project is built and maintained by Portfolify contributors. All rights belong to the individuals who contributed to its development.

## 🙌 Acknowledgments
Special thanks to all contributors and open-source libraries used in this project.

