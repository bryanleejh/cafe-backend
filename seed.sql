USE CafeManagement;

-- Insert Employee Data
INSERT INTO Employees (id, name, email_address, phone_number, gender) VALUES
('UI0000001', 'John Doe', 'john.doe@example.com', '91234567', 'Male'),
('UI0000002', 'Jane Smith', 'jane.smith@example.com', '81234567', 'Female'),
('UI0000003', 'Alice Johnson', 'alice.johnson@example.com', '91234568', 'Female'),
('UI0000004', 'Bob Brown', 'bob.brown@example.com', '81234568', 'Male');

-- Insert Cafe Data
INSERT INTO Cafes (id, name, description, logo, location) VALUES
(UUID(), 'Café Delight', 'A cozy café with a great selection of coffees.', NULL, 'Downtown'),
(UUID(), 'Brewed Awakening', 'Your perfect place to wake up.', NULL, 'Uptown'),
(UUID(), 'The Coffee Spot', 'A trendy café for young professionals.', NULL, 'Midtown');

-- Insert Employee-Café Relationships
INSERT INTO EmployeeCafe (employee_id, cafe_id, start_date) VALUES
('UI0000001', (SELECT id FROM Cafes WHERE name = 'Café Delight'), '2024-01-01'),
('UI0000002', (SELECT id FROM Cafes WHERE name = 'Brewed Awakening'), '2024-01-05'),
('UI0000003', (SELECT id FROM Cafes WHERE name = 'The Coffee Spot'), '2024-01-10');
