#!/usr/bin/env node

const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from the 'web' directory
app.use(express.static(path.join(__dirname, "web")));

// Route for '/swagger' to serve swagger.html
app.get("/swagger", (req, res) => {
  res.sendFile(path.join(__dirname, "web", "swagger.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
