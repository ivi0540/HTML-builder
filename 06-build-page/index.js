const fs = require("fs");
const path = require("path");

// 1-Создать новую папку
fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (error) => {
    if (error) {
        console.log(error);
    } else {
        // console.log("новая папка создана");
    };
    fs.mkdir(path.join(__dirname, "project-dist", "assets"), { recursive: true }, (error) => {
        if (error) {
            console.warn(error.message);
        };
    });
});

let articles = "";
let footer = "";
let header = "";
let about = "";
let template = "";
fs.readdir(path.join(__dirname, "components"), (error, files) => {

    let templateStream = fs.createReadStream(path.join(__dirname, "template.html"));
    templateStream.on("data", (data) => {
        template = data.toString();

        if (files.indexOf("articles.html") > -1) {
            let articlesStream = fs.createReadStream(path.join(__dirname, "components", "articles.html"));
            articlesStream.on("data", (data) => {
                articles = data.toString();
                template = template.replace("{{articles}}", articles);
            });
        };

        if (files.indexOf("footer.html") > -1) {
            let footerStream = fs.createReadStream(path.join(__dirname, "components", "footer.html"));
            footerStream.on("data", (data) => {
                footer = data.toString();
                template = template.replace("{{footer}}", footer);
            });
        };

        if (files.indexOf("about.html") > -1) {
            let aboutStream = fs.createReadStream(path.join(__dirname, "components", "about.html"));
            aboutStream.on("data", (data) => {
                about = data.toString();
                template = template.replace("{{about}}", about);

            });
        };
        if (files.indexOf("header.html") > -1) {
            let headerStream = fs.createReadStream(path.join(__dirname, "components", "header.html"));
            headerStream.on("data", (data) => {
                header = data.toString();
                template = template.replace("{{header}}", header);
                
                let writeStreamToIndex = fs.createWriteStream(path.join(__dirname, "project-dist", "index.html"));
                writeStreamToIndex.write(template, (error) => {
                    if (error) { console.warn(error.message); }
                });
            });
        };


    });
});

// 3-Копирование стилей из шаблона в 1 фаил
fs.readdir(path.join(__dirname, "styles"), (error, styles) => {
    fs.writeFile(path.join(__dirname, "project-dist", "style.css"), "", { recursive: true }, (error) => {
        if (error) {
            console.warn(error.message);
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
        // console.log(error.message);
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