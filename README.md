# SOMEWEAR

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
│── client/  # React Frontend
│   ├── public/
│   ├── src
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── hooksUI/
│   │   │   ├── reusableUI/
│   │   │   └── ui/
│   │   ├── features/
│   │   │   ├── admin/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   └── services/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   └── services/
│   │   │   ├── cart/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/
│   │   │   │   └── services/
│   │   │   ├── checkout/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   └── services/
│   │   │   ├── common
│   │   │   │   ├── components/
│   │   │   │   │   ├── navbar/
│   │   │   │   │   │   ├── hooks/
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   └── NavBar.tsx
│   │   │   │   │   ├── FooterBar.tsx
│   │   │   │   │   └── SearchBar.tsx
│   │   │   │   ├── pages/
│   │   │   │   └── services/
│   │   │   ├── feedback/
│   │   │   │   ├── components/
│   │   │   │   └── services/
│   │   │   ├── home
│   │   │   │   └── pages/
│   │   │   ├── product/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/
│   │   │   │   └── utils/
│   │   │   └── user
│   │   │       ├── components/
│   │   │       │   └── sidebar/
│   │   │       ├── hooks/
│   │   │       ├── pages/
│   │   │       │   ├── dashboard/
│   │   │       │   ├── order/
│   │   │       │   ├── settings/
│   │   │       │   └── ProfilePage.tsx
│   │   │       └── services/
│   │   ├── lib/
│   │   ├── services/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx

│── server/                         # Express backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts              # SQLite database connection
│   │   │   └── swagger.ts         # Swagger configuration
│   │   │
│   │   ├── controllers/           # Handle HTTP requests & responses
│   │   │   ├── UserController.ts
│   │   │   ├── ProductController.ts
│   │   │   ├── ProductVariantController.ts
│   │   │   ├── OrderController.ts
│   │   │   ├── OrderItemsController.ts
│   │   │   ├── CartItemsController.ts
│   │   │   ├── FeedbackController.ts
│   │   │   └── ContactUsController.ts
│   │   │
│   │   ├── services/              # Business logic layer
│   │   │   ├── UserService.ts
│   │   │   ├── ProductService.ts
│   │   │   ├── ProductVariantService.ts
│   │   │   ├── OrderService.ts
│   │   │   ├── OrderItemsService.ts
│   │   │   ├── CartItemsService.ts
│   │   │   ├── FeedbackService.ts
│   │   │   └── ContactUsService.ts
│   │   │
│   │   ├── repository/            # Database queries layer
│   │   │   ├── UserRepository.ts
│   │   │   ├── ProductRepository.ts
│   │   │   ├── ProductVariantRepository.ts
│   │   │   ├── OrderRepository.ts
│   │   │   ├── OrderItemsRepository.ts
│   │   │   ├── CartItemsRepository.ts
│   │   │   ├── FeedbackRepository.ts
│   │   │   └── ContactUsRepository.ts
│   │   │
│   │   ├── middleware/            # Authentication & authorization
│   │   │   ├── AuthMiddleWare.ts
│   │   │   ├── RoleMiddleWare.ts
│   │   │   └── MulterMiddleWare.ts
│   │   │
│   │   ├── routes/                # API routes
│   │   │   ├── UserRoutes.ts
│   │   │   ├── ProductRoutes.ts
│   │   │   ├── ProductVariantRoutes.ts
│   │   │   ├── OrderRoutes.ts
│   │   │   ├── OrderItemsRoutes.ts
│   │   │   ├── CartItemsRoutes.ts
│   │   │   ├── FeedbackRoutes.ts
│   │   │   └── ContactUsRoutes.ts
│   │   │
│   │   ├── interfaces/            # TypeScript interfaces
│   │   │   ├── UserInterface.ts
│   │   │   ├── ProductInterface.ts
│   │   │   ├── ProductVariantInterface.ts
│   │   │   ├── OrderInterface.ts
│   │   │   ├── OrderItemsInterface.ts
│   │   │   ├── CartItemsInterface.ts
│   │   │   ├── FeedbackInterface.ts
│   │   │   └── ContactUsInterface.ts
│   │   │
│   │   ├── utils/                 # Helper utilities
│   │   │   ├── jwt.ts             # JWT token generation & verification
│   │   │   ├── response.ts        # Standard API responses
│   │   │   ├── cloudinary.ts      # Cloudinary image upload config
│   │   │   └── hash.ts            # Password hashing utilities
│   │   │
│   │   └── app.ts                 # Main server entry point
│   │
│   ├── uploads/                   # Uploaded local files (if used)
│   ├── tests/                     # API / backend testing files
│   ├── .env                       # Environment variables
│   ├── package.json
│   ├── tsconfig.json
│   └── store.db
│
└── README.md

---

## Installation Guide

### 1. Clone Repository

```bash
git clone https://github.com/ahmedhamdiola/somewear
cd somewear
```

### 2. Install Backend Dependencies

```bash
cd server
npm init
```
Installed backend packages:

```bash
npm install express cors dotenv cookie-parser multer cloudinary bcryptjs jsonwebtoken swagger-ui-express swagger-jsdoc better-sqlite3
```

Installed development dependencies:

```bash
npm install -D typescript ts-node nodemon @types/node @types/express @types/cors @types/cookie-parser @types/jsonwebtoken @types/multer @types/bcryptjs
```

### 3. Install Frontend Dependencies

```bash
cd client
npm create vite
npm install axios tailwindcss @tailwindcss/vite heroicons react-router formik yup react-toastify 
npx shadcn@latest init
```

---

## Environment Variables

Create `.env` inside `/server`:

```env
PORT= process.env.db_path!
NODE_ENV=development
DB_PATH=./database.sqlite

JWT_SECRET=secret_key

CLOUDINARY_CLOUD_NAME=cloud_name
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret

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
npm run dev
```

---

## API Documentation

Swagger documentation:

```text
http://localhost:3000/api-docs
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
- Ahmed Hamdy (Worked mainly on frontend development and contributed to backend tasks)
- Bassam El-Sherif (Worked mainly on frontend development and contributed to backend tasks)
- Youssef Soliman (Contributed slightly to backend and frontend tasks)

---

## Future Improvements

- Payment gateway integration
- Wishlist feature
- Email notifications
