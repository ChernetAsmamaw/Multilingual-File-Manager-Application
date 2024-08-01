# Multilingual-File-Manager-Application | Project Documentation


### Overview
This project is a file manager system that allows users to upload, retrieve, and manage files. It is built using Node.js and Express.js, and it uses MongoDB for storing file metadata and user information. The application is multilingual and supports English, French, Spanish, and Amharic languages. It also uses Redis for caching user sessions and Docker for containerization. The project is a good example of an express.js bacquend application as it integrates essential concepts like databases, i18n, queuing systems, and unit testing in a practical application.

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
- i18n: Internationalization library for handling multiple languages.

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
├── |── i18n.js
├── utils
│   ├── auth.js
│   ├── db.js
│   ├── env_loader.js
│   ├── redis.js
├── |── translationLoader.js
├── routes
│   ├── index.js
├── libs
│   ├── boot.js
│   ├── middleware.js
├── locales
│   ├── en.json
│   ├── fr.json
├── |── es.json
├── |── am.json
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
- Authentication: Middleware for authenticating users using xToken, basicauthentication, and language headers.
- Error Handling: Middleware for handling errors and exceptions.
- i18n: Middleware for handling internationalization and localization (Accept-Language header for ['en', 'fr', 'es', 'am']).

### Database
- MongoDB: NoSQL database for storing file metadata and user information.
- Redis: In-memory data structure store for caching user sessions.

### Testing
- Unit Tests: Unit tests are written using the Chai assertion library.

### Docker
- Docker Compose: Used for running the application and dependencies in containers.
- Used for running redis and mongoDB in containers.