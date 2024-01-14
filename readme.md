Java Spring Boot Microservice for User and Task Management
This repository contains a Spring Boot microservice, developed using Java 19 or 21, designed to manage users and tasks. The service interacts with a PostgreSQL database for data persistence. It leverages Docker Compose for database setup, including pgAdmin for database management.

Features
User Management: CRUD operations for users.
Task Management: CRUD operations for tasks, associated with users.
Database Integration: PostgreSQL database implemented with Docker Compose.
Data Structure:
Users: Name, Email Address, Address (City, Zip Code, Street, House Number) utilizing @Embedded and @Embeddable annotations, Password (hashed).
Tasks: Task Title, Task Description.
API Endpoints
User APIs:
Create User
Get Users (including their tasks)
Get User by ID
Update User
Delete User (Soft delete, also deletes associated tasks)
Task APIs:
Create Task (assigned to a user)
Get Tasks
Get Task by ID
Update Task
Delete Task (Soft delete)
Soft Delete Functionality
Deletion operations are implemented as 'soft delete'. Deleting a user will result in a soft deletion of their associated tasks.

React Frontend Application
A single-page React application is included, styled with the Bootstrap library. The application features two tables:

Users Table: Lists users with action buttons for view, edit, and delete operations.
Tasks Table: Lists tasks with similar action capabilities.

Getting Started
This section provides instructions on how to set up and run the Java Spring Boot microservice and the accompanying React frontend application. Follow these steps to get the project up and running on your local machine for development and testing purposes.

Prerequisites
Before you begin, ensure you have the following installed on your system:

Java JDK 21: The application is built using Java 21. You can download it from Oracle's Java SE Downloads or use a version manager like SDKMAN.
Spring Boot: This project uses Spring Boot. It's recommended to use Spring Tool Suite or a similar IDE for development.
Docker: Docker is used for running the PostgreSQL database and pgAdmin. Install Docker from Docker's official website.
PostgreSQL: The database for the project, but you don't need to install it manually, as it will be run inside a Docker container.
Node.js and npm: Required for running the React frontend. Download and install them from Node.js official website.
Backend Setup
Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Start the PostgreSQL Database and pgAdmin:

Navigate to the directory containing the docker-compose.yml file.
Run the following command to start the PostgreSQL server and pgAdmin in Docker:
bash
Copy code
docker-compose up -d
Run the Spring Boot Application:

Open the backend project in your IDE (e.g., Spring Tool Suite).
Run the application as a Spring Boot App.
Frontend Setup
Navigate to the Frontend Directory:

From the root of the cloned repository:
bash
Copy code
cd path/to/frontend
Install Dependencies:

bash
Copy code
npm install
Run the React App:

bash
Copy code
npm start
This will start the React application, usually on localhost:3000.
Accessing the Application
The Spring Boot application will run on localhost:8081.
Access pgAdmin in your web browser at localhost:5050. Log in using the credentials specified in your docker-compose.yml file.
The React frontend will be available at localhost:3000.
This template should give users a clear guide on how to set up and run your project. You can adjust the paths, URLs, and other specifics as per your project's structure and requirements.