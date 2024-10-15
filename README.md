````markdown
# Cafe Management Backend

This is a Node.js backend for managing employee and cafe data using MySQL. The API provides endpoints to retrieve and manage employees, cafes, and their relationships.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running Locally](#running-locally)
- [Testing the API](#testing-the-api)
- [Endpoints](#endpoints)

## Features

- Manage employee and cafe information.
- Link employees to cafes with start dates.
- Retrieve cafes based on location and number of employees.
- Prevent employees from being assigned to more than one cafe.

## Technologies

- **Node.js** with Express.js
- **MySQL** as the database
- **dotenv** for environment configuration
- **uuid** for unique cafe IDs
- **mysql2** for MySQL database connection

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18.x or above)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (v8.x or above)
- [Git](https://git-scm.com/) (optional)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/cafe-management-backend.git
   cd cafe-management-backend
   ```
````

2. **Install Node.js dependencies**:

   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=CafeManagement
DB_PORT=3306
```

- `DB_HOST`: The host where your MySQL server is running (default is `localhost`).
- `DB_USER`: Your MySQL username (default is `root`).
- `DB_PASSWORD`: Your MySQL password.
- `DB_NAME`: The name of your database (in this case, `CafeManagement`).
- `DB_PORT`: The MySQL port (default is `3306`).

## Database Setup

1. **Start MySQL server**:

   If you’re using MySQL via Homebrew on macOS:

   ```bash
   brew services start mysql
   ```

2. **Create the MySQL Database**:

   Log into MySQL:

   ```bash
   mysql -u root -p
   ```

   Run the following commands to create the database and tables:

   ```sql
   CREATE DATABASE CafeManagement;
   USE CafeManagement;

   -- Create Employees Table
   CREATE TABLE Employees (
       id VARCHAR(9) PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email_address VARCHAR(100) NOT NULL,
       phone_number VARCHAR(8) NOT NULL,
       gender ENUM('Male', 'Female') NOT NULL
   );

   -- Create Cafes Table
   CREATE TABLE Cafes (
       id CHAR(36) PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       description TEXT NOT NULL,
       logo VARCHAR(255),
       location VARCHAR(100) NOT NULL
   );

   -- Create Employee-Cafe Relationship Table
   CREATE TABLE EmployeeCafe (
       employee_id VARCHAR(9),
       cafe_id CHAR(36),
       start_date DATE NOT NULL,
       PRIMARY KEY (employee_id),
       FOREIGN KEY (employee_id) REFERENCES Employees(id),
       FOREIGN KEY (cafe_id) REFERENCES Cafes(id)
   );
   ```

3. **Insert Seed Data** (Optional):

   You can use a `seed.sql` file to insert some initial data for testing. Save the SQL commands for seed data and run:

   ```bash
   mysql -u root -p CafeManagement < seed.sql
   ```

## Running Locally

1. **Start the server**:

   ```bash
   npm start
   ```

   This will start the Express server on the default port `3000`.

2. **Access the API**:

   Open your browser or use Postman to access the API at `http://localhost:3000`.

## Testing the API

Use any API testing tool like [Postman](https://www.postman.com/) or `curl` to test the API endpoints.

### Example Request:

**Get all cafes in a location**:

```bash
curl http://localhost:3000/cafes?location=Downtown
```

### Example Response:

```json
[
  {
    "name": "Café Delight",
    "description": "A cozy café with a great selection of coffees.",
    "employees": 5,
    "location": "Downtown",
    "id": "cafe-uuid-1"
  }
]
```

## Endpoints

1. **GET /cafes?location=<location>**

   Retrieve a list of cafes, optionally filtered by location. The list is sorted by the number of employees in descending order.

   - **Parameters**: `location` (optional query string)
   - **Response**: A list of cafes with the number of employees.

2. **GET /employees**

   Retrieve a list of all employees.

   - **Response**: A list of employees.

3. **POST /cafes**

   Add a new cafe.

   - **Body**: `name`, `description`, `location`, `logo` (optional).

4. **POST /employees**

   Add a new employee.

   - **Body**: `id`, `name`, `email_address`, `phone_number`, `gender`.

5. **POST /employee-cafe**

   Assign an employee to a cafe with a start date.

   - **Body**: `employee_id`, `cafe_id`, `start_date`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
