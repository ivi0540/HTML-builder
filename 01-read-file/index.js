const fs = require("fs");
const path = require("path");

const fileName = "text.txt";
const { stdout } = process;

const textFromFile = fs.createReadStream(`${path.dirname(__filename)}\\${fileName}`, "utf-8");
let allData = "";

textFromFile.on("data", (chunk) => {
    allData += chunk;
});
textFromFile.on("end", () => {
    stdout.write(allData);
});
textFromFile.on("error", (error) => {
    stdout.write(`Error -> ${error.message}`);
});