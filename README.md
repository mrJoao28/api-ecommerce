# 🛒 API E-commerce

REST API for an e-commerce backend built with **Node.js, Express, MongoDB and Mongoose**. The project demonstrates authentication with JWT, password hashing, role-based middleware, and product CRUD operations.

## ✨ Features

- 👤 User registration and management
- 🔐 Password hashing with bcrypt
- 🎟️ JWT-based authentication
- 🛡️ Role-based authorization middleware
- 📦 Product CRUD
- 🗄️ MongoDB persistence with Mongoose
- ❤️ Health-check endpoint
- ⚙️ Environment-based configuration

## 🛠️ Tech Stack

| Area | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JSON Web Token (JWT) |
| Password security | bcrypt |
| Configuration | dotenv |

## 📁 Architecture

```text
api-ecommerce/
├── controllers/    # Business logic for users and products
├── db/             # Database connection
├── middlewares/    # Authentication and authorization
├── models/         # Mongoose schemas
├── routes/         # HTTP route definitions
├── server.js       # Application bootstrap
├── .env.example    # Environment template
└── package.json
```

The project separates HTTP routing, business logic, persistence models, database configuration, and authorization middleware to keep responsibilities focused.

## 🔑 API Overview

Base path: `/ecommerce`

Typical resources include:

- User registration/login
- User update/deletion
- Product creation
- Product listing
- Product lookup by ID
- Product update
- Product deletion

A health endpoint is available at `GET /health` and returns a small JSON status response.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB connection string

### Installation

```bash
git clone https://github.com/mrJoao28/api-ecommerce.git
cd api-ecommerce
npm install
```

### Environment

Copy the template:

```bash
cp .env.example .env
```

Configure:

```env
PORT=3000
URL=mongodb://localhost:27017/ecommerce
AcessToken=your-long-random-secret
```

> ⚠️ Never commit `.env` or real secrets.

### Run

Development:

```bash
npm run dev
```

Production-style:

```bash
npm start
```

The API will be available at `http://localhost:3000` by default.

## 🔐 Security notes

- Passwords are stored as bcrypt hashes rather than plaintext.
- JWT secrets are loaded from environment variables.
- Protected product operations use authorization middleware.
- Production deployments should use a strong, rotated JWT secret and secure database credentials.
- Input validation and centralized error handling can be expanded further as the API grows.

## 👤 Author

**João** — [@mrJoao28](https://github.com/mrJoao28)
