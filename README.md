Recruitment Task API - Library Management System
Description
This repository contains the source code for a virtual library management system API. The API allows users to register, log in, and perform various operations related to book management. It includes functionalities for both regular users and administrators.

Setup
Clone the repository:

bash
Copy code
git clone <repository-url>
Install dependencies:

bash
Copy code
npm install
Configure the database:

Create a relational database (e.g., MySQL).
Update the database connection details in config/dbConfig.js.
Run the application:

bash
Copy code
npm start
The API will be accessible at http://localhost:3001

Authentication
POST /register: Register a new user.
POST /login: Log in a user.
Administrator Authentication
POST /admin/register: Register a new administrator.
POST /admin/login: Log in an administrator.
Book Management (Administrator Only)
POST /admin/addbook: Add a new book to the library.
DELETE /admin/deletebook/:id: Delete a book from the library.
PUT /admin/editbook/:id: Edit details of a specific book in the library.
Book Display
GET /books: Get a list of all books in the library.
GET /availablebooks: Get a list of available books for borrowing.
User Operations
POST /borrow/:id: Borrow a book.
POST /return/:id: Return a borrowed book.
Middleware
verifyUserJWT: Verify JWT token for regular user authentication.
verifyAdminJWT: Verify JWT token for administrator authentication.
Database Models
User: Model for regular user registration and authentication.
Admin: Model for administrator registration and authentication.
Book: Model for book-related operations.
Technologies Used
Node.js
Express.js
MySQL (or your preferred relational database)
JWT for authentication
Notes
Regular users and administrators have separate authentication endpoints.
Regular users cannot perform administrator actions, and vice versa.
Books that are borrowed cannot be borrowed again until returned.
Feel free to choose your preferred backend technology, database, and additional libraries for this implementation.
