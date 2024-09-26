const db = require("../models/db");

// Get Cafes based on location and number of employees
exports.getCafes = (req, res) => {
  const location = req.query.location || "";
  const sql = `SELECT cafes.id, cafes.name, cafes.description, cafes.location, cafes.logo, COUNT(employees.id) AS employees
                 FROM cafes
                 LEFT JOIN employees ON cafes.id = employees.cafe_id
                 ${location ? `WHERE cafes.location = ?` : ""}
                 GROUP BY cafes.id
                 ORDER BY employees DESC`;

  db.query(sql, [location], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Create a new cafe
exports.createCafe = (req, res) => {
  const { name, description, location } = req.body;
  const sql = `INSERT INTO cafes (id, name, description, location) VALUES (UUID(), ?, ?, ?)`;
  db.query(sql, [name, description, location], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: "Cafe created successfully!" });
  });
};

// Update existing cafe
exports.updateCafe = (req, res) => {
  const { id, name, description, location } = req.body;
  const sql = `UPDATE cafes SET name = ?, description = ?, location = ? WHERE id = ?`;
  db.query(sql, [name, description, location, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Cafe updated successfully!" });
  });
};

// Delete a cafe
exports.deleteCafe = (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM cafes WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Cafe deleted successfully!" });
  });
};
