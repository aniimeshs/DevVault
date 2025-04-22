# DevVault - Developer Notes + Project Tracker

DevVault is a developer-centric project tracker and notes app designed to help developers manage their tasks, notes, and track project progress effectively. It allows users to authenticate, create and store notes, track progress, and more.

## Features

- User Authentication (JWT-based)
- Role-based access control
- Create, update, and delete notes
- Track project tasks and progress
- MongoDB database with Mongoose ORM

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** MongoDB
- **Other:** bcrypt for password hashing, dotenv for environment variables

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/DevVault.git
    cd DevVault
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory with the following:
    ```plaintext
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongo_connection_string
    ```

4. Start the server:
    ```bash
    npm start
    ```

   The server will be running at `http://localhost:3000`.

## API Endpoints

- **POST** `/api/auth/login`: Login a user
  - Request body: 
    ```json
    {
      "email": "heythere@gmail.com",
      "password": "heythere"
    }
    ```

- **POST** `/api/auth/register`: Register a new user
  - Request body:
    ```json
    {
      "email": "newuser@example.com",
      "password": "password123"
    }
    ```

- **GET** `/api/notes`: Get all notes (Authenticated route)
- **POST** `/api/notes`: Create a new note (Authenticated route)
  - Request body:
    ```json
    {
      "title": "My First Note",
      "content": "This is the content of the note."
    }
    ```

## Future Features

- Implement advanced filtering and search for notes
- Add support for project-specific note tracking
- Implement notifications for task deadlines

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-branch`).
5. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
