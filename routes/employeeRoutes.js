const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/employees", employeeController.getEmployees);
router.post("/employee", employeeController.createEmployee);
router.put("/employee", employeeController.updateEmployee);
router.delete("/employee", employeeController.deleteEmployee);

module.exports = router;
