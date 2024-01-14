<h1>Java Spring Boot Microservice for User and Task Management</h1>

<p>This repository contains a Spring Boot microservice, developed using Java 21, designed to manage users and tasks. The service interacts with a PostgreSQL database for data persistence. It leverages Docker Compose for database setup, including pgAdmin for database management.</p>

<h2>Features</h2>
<ul>
  <li><strong>User Management:</strong> CRUD operations for users.</li>
  <li><strong>Task Management:</strong> CRUD operations for tasks, associated with users.</li>
  <li><strong>Database Integration:</strong> PostgreSQL database implemented with Docker Compose.</li>
</ul>

<h3>Data Structure</h3>
<ul>
  <li><strong>Users:</strong> Name, Email Address, Address (City, Zip Code, Street, House Number) utilizing <code>@Embedded</code> and <code>@Embeddable</code> annotations, Password (hashed).</li>
  <li><strong>Tasks:</strong> Task Title, Task Description.</li>
</ul>

<h2>API Endpoints</h2>
<h3>User APIs:</h3>
<ul>
  <li>Create User</li>
  <li>Get Users (including their tasks
)</li>

  <li>Get User by ID</li>
  <li>Update User</li>
  <li>Delete User (Soft delete, also deletes associated tasks)</li>
</ul>
<h3>Task APIs:</h3>
<ul>
  <li>Create Task (assigned to a user)</li>
  <li>Get Tasks</li>
  <li>Get Task by ID</li>
  <li>Update Task</li>
  <li>Delete Task (Soft delete)</li>
</ul>
<h2>Soft Delete Functionality</h2>
<p>Deletion operations are implemented as 'soft delete'. Deleting a user will result in a soft deletion of their associated tasks.</p>
<h2>React Frontend Application</h2>
<p>A single-page React application is included, styled with the Bootstrap library. The application features an overall view and modification possibilities at the tables component and components to use api endpoints separately. Also has a welcome page at root, a navbar for navigating between components, and minimal styling.</p>
<h2>Getting Started</h2>
<p>This section provides instructions on how to set up and run the Java Spring Boot microservice and the accompanying React frontend application. Follow these steps to get the project up and running on your local machine for development and testing purposes.</p>
<h3>Prerequisites</h3>
<p>Before you begin, ensure you have the following installed on your system:</p>
<ul>
  <li><strong>Java JDK 21:</strong> The application is built using Java 21. You can download it from <a href="https://www.oracle.com/java/technologies/javase-jdk21-downloads.html">Oracle's Java SE Downloads</a> or use a version manager like <a href="https://sdkman.io/">SDKMAN</a>.</li>
  <li><strong>Spring Boot:</strong> This project uses Spring Boot. And has been developed inside <a href="https://www.jetbrains.com/idea/download">IntelliJ IDEA</a> its recoommended to use it or a similar IDE for development.</li>
  <li><strong>Docker:</strong> Docker is used for running the PostgreSQL database and pgAdmin. Install Docker from <a href="https://www.docker.com/products/docker-desktop">Docker's official website</a>.</li>
  <li><strong>PostgreSQL:</strong> The database for the project, but you don't need to install it manually, as it will be run inside a Docker container.</li>
  <li><strong>Node.js and npm:</strong> Required for running the React frontend. Download and install them from <a href="https://nodejs.org/">Node.js official website</a>.</li>
</ul>
<h3>Backend Setup</h3>
<p>Clone the Repository:</p>
<pre>
<code>
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
</code>
</pre>
<p>Start the PostgreSQL Database and pgAdmin:</p>
<ul>
  <li>Navigate to the directory containing the <code>docker-compose.yml</code> file.</li>
  <li>Run the following command to start the PostgreSQL server and pgAdmin in Docker:
    <pre><code>docker-compose up -d</code></pre>
  </li>
</ul>
<p>Run the Spring Boot Application:</p>
<ul>
  <li>Open the backend project in your IDE (e.g., IntelliJ IDEA).</li>
  <li>Run the application as a Spring Boot App.</li>
</ul>
<h3>Frontend Setup</h3>
<p>Navigate to the Frontend Directory:</p>
<ul>
  <li>From the root of the cloned repository:
    <pre><code>cd pathtoprojectfolder\src\frontend\user-task-manager-frontend</code></pre>
  </li>
</ul>
<p>Install Dependencies:</p>
<pre><code>npm install</code></pre>
<pre><code>npm install axios</code></pre>
<pre><code>npm install react-router-dom</code></pre>
<p>Run the React App:</p>
<pre><code>npm start</code></pre>
<p>This will start the React application, usually on localhost:3000.</p>
<h3>Accessing the Application</h3>
<p>The Spring Boot application will run on localhost:8081.</p>
<p>Access pg
Admin in your web browser at localhost:5050. Log in using the credentials specified in your docker-compose.yml file.</p>

<p>The React frontend will be available at localhost:3000.</p>
