# DevVault - Developer Notes + Project Tracker

DevVault is a developer-centric project tracker and notes app designed to help developers manage their tasks, notes, and track project progress effectively. It allows users to authenticate, create and store notes, track progress, and more.

## Features

- User Authentication (JWT-based)
- Role-based access control (user/admin roles)
- Project Management
  - Create, update, and delete projects
  - Track project status (Planning, In Progress, Completed)
  - Add tech stack to projects
- Note Management
  - Create, update, and delete notes
  - Tag-based organization
  - Project-specific notes
  - Search, filter, and sort notes
- Dashboard Statistics
  - Total projects count
  - Total notes count
  - Project status breakdown

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt for password hashing
- **Environment:** dotenv for configuration

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
   PORT=3000
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server will be running at `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST** `/api/auth/register`: Register a new user

  - Request body:
    ```json
    {
      "username": "newuser",
      "email": "newuser@example.com",
      "password": "password123"
    }
    ```

- **POST** `/api/auth/login`: Login a user
  - Request body:
    ```json
    {
      "username": "newuser",
      "password": "password123"
    }
    ```

### Projects

- **GET** `/api/projects`: Get all projects (Authenticated)
- **POST** `/api/projects`: Create a new project (Authenticated)
  - Request body:
    ```json
    {
      "title": "My Project",
      "description": "Project description",
      "techStack": ["Node.js", "React"],
      "status": "Planning"
    }
    ```
- **GET** `/api/projects/:id`: Get project by ID (Authenticated)
- **PUT** `/api/projects/:id`: Update project (Authenticated)
- **DELETE** `/api/projects/:id`: Delete project (Authenticated)

### Notes

- **GET** `/api/notes`: Get all notes (Authenticated)
  - Query parameters:
    - `project`: Filter by project ID
    - `tags`: Filter by tags (comma-separated)
    - `search`: Search in title and content
    - `sort`: Sort by fields (e.g., `-createdAt`)
- **POST** `/api/notes`: Create a new note (Authenticated)
  - Request body:
    ```json
    {
      "title": "My Note",
      "content": "Note content",
      "tags": ["important", "todo"],
      "project": "project_id_here"
    }
    ```
- **GET** `/api/notes/:id`: Get note by ID (Authenticated)
- **PUT** `/api/notes/:id`: Update note (Authenticated)
- **DELETE** `/api/notes/:id`: Delete note (Authenticated)

### Dashboard

- **GET** `/api/dashboard`: Get dashboard statistics (Authenticated)
  - Returns:
    - Total projects count
    - Total notes count
    - Project status breakdown

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit them (`git commit -am 'Add new feature'`)
4. Push to your branch (`git push origin feature-branch`)
5. Create a new pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
