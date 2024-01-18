const fs = require("fs");
const path = require("path");
const { stdin, stdout } = process;
const secretFolderName = "secret-folder";

const pathToSecretFolder = `${__dirname}\\${secretFolderName}`;
fs.readdir(pathToSecretFolder, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err.message);
    } else {
        files.forEach((item) => {
            if (!item.isDirectory()) {
                let pathToFile = `${__dirname}\\${item.name}`;
                fs.stat(`${pathToSecretFolder}\\${item.name}`, (err, item2) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        console.log(`${path.parse(pathToFile).name} - ${path.extname(item.name)} - ${item2.size}kb`);
                    }
                });
            }
        });
    }
});
