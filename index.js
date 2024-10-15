const express = require("express");
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

// Get all cafes or filtered by location
app.get("/cafes", async (req, res) => {
  const { location } = req.query;

  try {
    let query = `
      SELECT c.name, c.description, COUNT(e.id) AS employees, c.logo, c.location, c.id 
      FROM Cafes c
      LEFT JOIN EmployeeCafe ec ON c.id = ec.cafe_id
      LEFT JOIN Employees e ON e.id = ec.employee_id
      `;
    const values = [];

    if (location) {
      query += ` WHERE c.location = ?`;
      values.push(location);
    }

    query += ` GROUP BY c.id ORDER BY employees DESC`;

    const [rows] = await pool.query(query, values);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cafes." });
  }
});

// Get all employees
app.get("/employees", async (req, res) => {
  try {
    const [employees] = await pool.query("SELECT * FROM Employees");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees." });
  }
});

// Add new cafe
app.post("/cafes", async (req, res) => {
  const { name, description, location, logo } = req.body;
  const id = uuidv4();

  try {
    await pool.query(
      "INSERT INTO Cafes (id, name, description, location, logo) VALUES (?, ?, ?, ?, ?)",
      [id, name, description, location, logo || null]
    );
    res.status(201).json({ message: "Cafe added successfully", id });
  } catch (error) {
    res.status(500).json({ error: "Error adding cafe." });
  }
});

// Add new employee
app.post("/employees", async (req, res) => {
  const { id, name, email_address, phone_number, gender } = req.body;

  try {
    await pool.query(
      "INSERT INTO Employees (id, name, email_address, phone_number, gender) VALUES (?, ?, ?, ?, ?)",
      [id, name, email_address, phone_number, gender]
    );
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding employee." });
  }
});

// Assign employee to a cafe
app.post("/employees/assign", async (req, res) => {
  const { employee_id, cafe_id, start_date } = req.body;

  try {
    // Ensure employee is not already assigned to a cafe
    const [existing] = await pool.query(
      "SELECT * FROM EmployeeCafe WHERE employee_id = ?",
      [employee_id]
    );

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ error: "Employee already assigned to a cafe." });
    }

    await pool.query(
      "INSERT INTO EmployeeCafe (employee_id, cafe_id, start_date) VALUES (?, ?, ?)",
      [employee_id, cafe_id, start_date]
    );
    res.status(201).json({ message: "Employee assigned to cafe successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error assigning employee." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
