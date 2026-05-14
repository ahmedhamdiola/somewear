"# somewear" 

## Project Overview
Somewear is a full-stack e-commerce web application for clothing shopping.  
The platform allows customers to browse products, manage carts, place orders, leave feedback, and securely authenticate using JWT cookies.

The project consists of:

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** SQLite
- **Authentication:** JWT + HTTP-only Cookies
- **Image Storage:** Cloudinary

---

## Features

### Customer Features
- User registration & login
- JWT cookie authentication
- Browse products by category/subcategory
- Product variants (size, stock)
- Shopping cart management
- Checkout & order creation
- Order history
- Product feedback
- Contact us form

### Admin Features
- Product management (CRUD)
- Product variants management
- Order management
- Update order status
- Delete users
- View feedback
- View all users

---

## Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM
- CSS / Tailwind

### Backend
- Node.js
- Express.js
- TypeScript
- better-sqlite3
- JWT Authentication
- Multer
- Cloudinary
- Swagger API Documentation

---

## Project Structure

```bash
somewear/
│── client/                 # React frontend
│── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── config/
│   │   └── utils/
│── README.md
```

---

## Installation Guide

### 1. Clone Repository

```bash
git clone YOUR_GITHUB_LINK
cd somewear
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
```

---

## Environment Variables

Create `.env` inside `/server`:

```env
PORT= process.env.db_path!
NODE_ENV=development
DB_PATH=./src/config/database.sqlite

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

BASE_URL=http://localhost:PORT
```

---

## Running the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm start
```

---

## API Documentation

Swagger documentation:

```text
http://localhost:PORT/api-docs
```

Contains:
- Authentication APIs
- Products APIs
- Orders APIs
- Cart APIs
- Feedback APIs
- Contact APIs

---

## Authentication

The system uses:

- JWT Authentication
- HTTP-only Cookies
- Role-based authorization

Roles:
- Customer
- Admin

---

## Database

Database used:

```text
SQLite
```

Main tables:
- users
- products
- product_variants
- cart_items
- orders
- order_items
- feedback
- contact_us

---

## Architecture

The backend follows layered architecture:

```text
Controller → Service → Repository → Database
```

Authentication flow:

```text
React Frontend → Express API → Middleware → JWT Cookie → Database
```

---

## Team Members

- Ahmed Hossam (Led backend development and integrated frontend with backend)
- Ahmed Hamdy (Worked mainly on frontend developmentand contibuted to backend tasks)
- Bassam El-Sherif (Worked mainly on frontend developmentand contibuted to backend tasks)
- Youssef Soliman (Contributed slightly to backend and frontend tasks)

---

## Future Improvements

- Payment gateway integration
- Wishlist feature
- Email notifications