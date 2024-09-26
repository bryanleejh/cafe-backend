const db = require("../models/db");

// Get employees based on cafe and days worked
exports.getEmployees = (req, res) => {
  const cafe = req.query.cafe || "";
  const sql = `SELECT employees.id, employees.name, employees.email_address, employees.phone_number, 
                        DATEDIFF(CURDATE(), employees.start_date) AS days_worked, cafes.name AS cafe
                 FROM employees
                 LEFT JOIN cafes ON employees.cafe_id = cafes.id
                 ${cafe ? `WHERE cafes.name = ?` : ""}
                 ORDER BY days_worked DESC`;

  db.query(sql, [cafe], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Create a new employee and assign to a cafe
exports.createEmployee = (req, res) => {
  const {
    id,
    name,
    email_address,
    phone_number,
    gender,
    cafe_name,
    start_date,
  } = req.body;
  const sql = `INSERT INTO employees (id, name, email_address, phone_number, gender, cafe_id, start_date) 
                 VALUES (?, ?, ?, ?, ?, (SELECT id FROM cafes WHERE name = ?), ?)`;

  db.query(
    sql,
    [id, name, email_address, phone_number, gender, cafe_name, start_date],
    (err, result) => {
      if (err) throw err;
      res.status(201).json({ message: "Employee created successfully!" });
    }
  );
};

// Update an employee and their cafe assignment
exports.updateEmployee = (req, res) => {
  const {
    id,
    name,
    email_address,
    phone_number,
    gender,
    cafe_name,
    start_date,
  } = req.body;
  const sql = `UPDATE employees SET name = ?, email_address = ?, phone_number = ?, gender = ?, 
                 cafe_id = (SELECT id FROM cafes WHERE name = ?), start_date = ? WHERE id = ?`;

  db.query(
    sql,
    [name, email_address, phone_number, gender, cafe_name, start_date, id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Employee updated successfully!" });
    }
  );
};

// Delete an employee
exports.deleteEmployee = (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM employees WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Employee deleted successfully!" });
  });
};
