# Book Review API

A simple REST API for managing books and reviews, with JWT-based authentication.

## Features

- User Signup/Login (JWT)
- Add, view, and search books
- Submit, update, and delete reviews
- Average rating per book

## Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** + **Mongoose**
- **JWT (JSON Web Token)** for authentication
- **dotenv** for configuration

## 🛠️ Features

- ✅ JWT-based user authentication
- ✅ Add/view books with pagination and filters
- ✅ Add, update, delete reviews (1 per user/book)
- ✅ Book search by title or author (partial + case-insensitive)

## Setup Instructions

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with:
4. Run `npm start`

## API Endpoints

### Auth
- `POST /api/auth/signup` — `{ username, password }`
- `POST /api/auth/login` — `{ username, password }  receive JWT token `

### Books
- `POST /api/books` — Add book (Auth)
- `GET /api/books` — List books (pagination, `?author=&genre=&page=1&limit=10`)
- `GET /api/books/:id` — Book details + reviews + average rating
- `GET /api/books/search?query=...` — Search by title/author

### Reviews
- `POST /api/books/:id/reviews` — Submit a review (Auth)
- `PUT /api/reviews/:id` — Update own review
- `DELETE /api/reviews/:id` — Delete own review

## Design Decisions

- Used Mongoose indexing to enforce one-review-per-user-per-book
- Decoupled routes and controllers for clarity and reusability

🧪 Sample API Requests
📌 Signup
POST /api/auth/signup