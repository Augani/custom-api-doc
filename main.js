#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const minimist = require("minimist");

// Parse command-line arguments
const args = minimist(process.argv.slice(2));

// Ensure the assets directory exists
const assetsDir = path.join(__dirname, "web", "assets");
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Function to convert YAML to JSON and save to assets folder
function convertYamlToJson(inputFile) {
  try {
    const fileContents = fs.readFileSync(inputFile, "utf8");
    const data = yaml.load(fileContents);
    const jsonContent = JSON.stringify(data, null, 2);
    const baseName = path.basename(inputFile, path.extname(inputFile));
    const outputFile = path.join(assetsDir, `${baseName}.json`);
    fs.writeFileSync(outputFile, jsonContent, "utf8");
    console.log(`Converted ${inputFile} to ${outputFile}`);
  } catch (e) {
    console.error(`Error processing file ${inputFile}:`, e.message);
  }
}

// Process --swagger parameter
if (args.swagger) {
  const swaggerFiles = Array.isArray(args.swagger)
    ? args.swagger
    : [args.swagger];
  swaggerFiles.forEach((file) => {
    convertYamlToJson(file);
  });
} else {
  console.error("No --swagger parameter provided.");
}

// Process --menu parameter
if (args.menu) {
  const menuFile = args.menu;
  convertYamlToJson(menuFile);
} else {
  console.error("No --menu parameter provided.");
}
