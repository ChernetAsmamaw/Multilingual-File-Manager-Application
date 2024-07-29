# Multilingual-File-Manager-Application | Project Documentation


### Overview
This project is a file manager system it integrates essential concepts like databases, i18n, queuing systems, and unit testing in a practical application. It provides functionality for file management operations such as unpublishing, retrieving, and deleting files, as well as user authentication and status checks.

### Features
- Check API Status: Endpoint to check the status and statistics of the API.
- User Management: Add users, retrieve user information, delete users, and connect and disconnect users.
- File Management: Upload, retrieve, manage visibility, and delete files.
#### Technical Choices
- Node.js: JavaScript runtime environment used for building the server.
- Express.js: Web framework for handling HTTP requests and routing.
- MongoDB: NoSQL database for storing file metadata and user information.
- Redis: In-memory data structure store for caching user sessions.
- Docker: Containerization platform for running the application and dependencies.
- Chai: Assertion library for writing unit tests.
- Middleware: For authentication and error handling.

### Project Setup
Prerequisites
- Node.js: Ensure Node.js is installed on your system.
- MongoDB: Ensure MongoDB is installed and running.
- Redis: Ensure Redis is installed and running.

#### Installation
1. Clone the Repository
`git clone <repository-url>`
`cd <repository-directory>`
2. Install Dependencies
Run the following command to install the required npm packages:
`npm install`
3. Environment Variables
Set up necessary environment variables. For example:
`PORT=3000`
4. Start the Server
Run the following command to start the server:
`npm run start-server`
5. Access the API
The API is now accessible at `http://localhost:3000`
### Project Structure
The project structure is as follows:
```
multilingual-file-manager
├── controllers
│   ├── AuthController.js
│   ├── FileController.js
│   ├── AppController.js
├── |── UsersControllers.js
├── middlewares
│   ├── auth.js
│   ├── error.js
├── utils
│   ├── auth.js
│   ├── db.js
│   ├── env_loader.js
│   ├── redis.js
├── routes
│   ├── index.js
├── libs
│   ├── boot.js
│   ├── middleware.js
├── tests
│   ├── controllers
│   |             ├── AuthController.test.js
│   |             ├── FileController.test.js
│   |             ├── AppController.test.js
│   |             ├── UsersController.test.js
│   ├── utils
│   |   ├── db.test.js
│   |   ├── redis.test.js
│   ├── init.test.js
├── .env
├── .gitignore
├── package.json
├── README.md
├── server.js
|── worker.js
```


### API Endpoints
* Status and Statistics
  - Check API Status: GET /status --> Check the status of the mongoDB and Redis connections.
  - Get API Statistics: GET /stats --> Get statistics of the number of users and files in the database.

* User Management
    - Create New User: POST /users
    - List All Users: GET /users --> Lists all users.
    - Get Current User: GET /users/me --> Connect: Requires xToken authentication.
    - Connect User: GET /connect --> Connects the user, requiring basic authentication.
    - Disconnect User: GET /disconnect --> Disconnects the user, requiring xToken authentication.
    - Get User Information: GET /users/:id --> Retrieves user information.
    - Delete User: DELETE /users/:id --> Deletes a user from the database.
* File Management
Requires xToken authentication.
  - Upload New File: POST /files --> Uploads a new file.
  - Retrieve File Information: GET /files/:id  --> Retrieves metadata of a file.
  - List All Files: GET /files --> Lists all files.
  - Publish a File: PUT /files/:id/publish --> Makes a file public.
  - Unpublish a File: PUT /files/:id/unpublish --> Makes a file private.
  - Retrieve File Content: GET /files/:id/data --> Retrieves the content of a file.
  - Delete a File: DELETE /files/:id --> Deletes a file from the database and file system.

### Middleware
- Authentication: Middleware for authenticating users using xToken and basic authentication.
- Error Handling: Middleware for handling errors and exceptions.

### Database
- MongoDB: NoSQL database for storing file metadata and user information.
- Redis: In-memory data structure store for caching user sessions.

### Testing
- Unit Tests: Unit tests are written using the Chai assertion library.

### Docker
- Docker Compose: Used for running the application and dependencies in containers.
- Used for running redis and mongoDB in containers.