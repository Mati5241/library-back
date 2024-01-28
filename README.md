# Recruitment Task API - Library Management System

## Description

This repository contains the source code for a virtual library management system API. The API allows users to register, log in, and perform various operations related to book management. It includes functionalities for both regular users and administrators.

## Setup

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure the database:**

    - Create a relational database (e.g., MySQL).
    - Update the database connection details in `config/dbConfig.js`.

4. **Run the application:**

    ```bash
    npm start
    ```

5. The API will be accessible at [http://localhost:3001](http://localhost:3001)

## Middleware

- **verifyUserJWT**: Verify JWT token for regular user authentication.
- **verifyAdminJWT**: Verify JWT token for administrator authentication.

## Database Models

- **User**: Model for regular user registration and authentication.
- **Admin**: Model for administrator registration and authentication.
- **Book**: Model for book-related operations.

## Technologies Used

- Node.js
- Express.js
- MySQL (or your preferred relational database)
- JWT for authentication

## Notes

- Regular users and administrators have separate authentication endpoints.
- Regular users cannot perform administrator actions, and vice versa.
- Books that are borrowed cannot be borrowed again until returned.
- Feel free to choose your preferred backend technology, database, and additional libraries for this implementation.

## License

This project is licensed under the [MIT License](LICENSE).
