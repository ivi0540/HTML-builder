const fs = require("fs");
const path = require("path");

// 1-Создать новую папку
fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (error) => {
    if (error) {
        console.log(error);
    } else {
        // console.log("новая папка создана");
        fs.mkdir(path.join(__dirname, "project-dist", "assets"), { recursive: true }, (error) => {
            if (error) {
                console.log(error);
            };
        });
    };
});

let articles = "";
let footer = "";
let header = "";
let template = "";
fs.readdir(path.join(__dirname, "components"), (error, files) => {
    files.forEach((file) => {

        fs.readFile(path.join(__dirname, "components", file), "utf-8", (error, textInDoc) => {
            if (file === "articles.html") {
                articles = textInDoc;
            };
            if (file === "footer.html") {
                footer = textInDoc;
            };
            if (file === "header.html") {
                header = textInDoc;
            };
        });

        fs.readFile(path.join(__dirname, "template.html"), "utf-8", (error, textInTemplate) => {
            template = textInTemplate;
            template = template.replace("{{header}}", header);
            template = template.replace("{{footer}}", footer);
            template = template.replace("{{articles}}", articles);

            // 2-Замена шабловов и сохдание нового index.js
            fs.writeFile(path.join(__dirname, "project-dist", "index.html"), template, { recursive: true }, (error) => {
                if (error) {
                    console.log(error.message);
                };
            });
        });
    });

    // 3-Копирование стилей из шаблона в 1 фаил
    fs.readdir(path.join(__dirname, "styles"), (error, styles) => {
        fs.writeFile(path.join(__dirname, "project-dist", "style.css"), "", { recursive: true }, (error) => {
            if (error) {
                console.log(error.message);
            };
        });
        styles.forEach((style) => {
            fs.readFile(path.join(__dirname, "styles", style), "utf-8", (error, textInStyle) => {
                if (path.extname(path.join(__dirname, "styles", style)) === ".css") {
                    fs.appendFile(path.join(__dirname, "project-dist", "style.css"), textInStyle, { recursive: true }, (error) => {
                        if (error) {
                            console.log(error.message);
                        };
                    });
                };
            });
        });
    });

    fs.rm(path.join(__dirname, "project-dist", "assets"), { recursive: true }, (error) => {
        if (error) {
            console.log(error.message);
        } else {
            // console.log("Удаление прошло успешно");
        };
        fs.cp(path.join(__dirname, "assets"), path.join(__dirname, "project-dist", "assets"), { recursive: true }, (error) => {
            if (error) {
                console.log(error.message);
            } else {
                // console.log("копирование прошло успешно");
            };
        });
    });

});

