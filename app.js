const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const cafeRoutes = require("./routes/cafeRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(bodyParser.json());

app.use(cafeRoutes);
app.use(employeeRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
