const fs = require("fs");
const path = require("path");
const { stdin, stdout } = process;

const fileName = "02-write-file.txt";

const writeToTextFile = fs.createWriteStream(`${path.dirname(__filename)}\\${fileName}`);
const textFromFile = fs.createReadStream(`${path.dirname(__filename)}\\${fileName}`, "utf-8");

let allData = "";

stdout.write(">>>>Please enter text: <<<< \n");
writeToTextFile.write("");

function getTextFromFile() {
    let allData = "";
    textFromFile.on("data", (chunk) => {
        allData += chunk;
    });
    return allData;
}

stdin.on("data", (data) => {
    const dataToString = data.toString().slice(0, data.toString().length - 2);
    if (dataToString !== "exit") {
        allData = getTextFromFile() + dataToString + "\n";
        writeToTextFile.write(allData);
    } else {
        process.exit();
    };
});
process.on("exit", () => {
    stdout.write(">>>> Goodbye! <<<<");
});

process.on("SIGINT", () => {
    process.exit();
});

