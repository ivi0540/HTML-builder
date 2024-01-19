const fs = require("fs");
const path = require("path");

const folderToCopy = "files";
const newFolder = "files-copy";

function copyDir() {
    // Создание пустой папки
    function createNewFolder() {
        fs.mkdir(path.join(__dirname, newFolder), { recursive: true }, (error) => {
            if (error) {
                console.log(error);
            };
        });
    };

    fs.readdir(path.join(__dirname, folderToCopy), (error, files) => {
        if (error) {
            console.log(error.message);
        } else {
            createNewFolder();
            // Копирование файлов в новцю папку
            files.forEach((file) => {
                fs.copyFile(path.join(__dirname, folderToCopy, file), path.join(__dirname, newFolder, file), (error) => {
                    if (error) {
                        console.log(error.message);
                    };
                });
            });
        };
        // Удаление файлов которые не должны копироваться
        fs.readdir(path.join(__dirname, newFolder), { recursive: true }, (error, filesToNewFolder) => {
            if (error) {
                console.log(error.message);
            } else {
                filesToNewFolder.forEach((fileToNewFolder) => {
                    if (files.indexOf(fileToNewFolder) === -1) {
                        fs.rm(path.join(__dirname, newFolder, fileToNewFolder), { recursive: true }, (error) => {
                            if (error) {
                                console.log(error.message);
                            };
                        });
                    };
                });
            };
        });
    });
};

copyDir();