const fs = require("fs");
const path = require("path");

const stylesFolder = "styles";
const extnameForStyle = ".css";

fs.readdir(path.join(__dirname, stylesFolder), (error, styles) => {
    if (error) {
        console.log(error.message);
    } else {
        writeBundleFile("");
        styles.forEach((style) => {
            if (path.extname(path.join(__dirname, stylesFolder, style)) === extnameForStyle) {
                fs.readFile(path.join(__dirname, stylesFolder, style), "utf-8", (error, data) => {
                    if (error) {
                        console.log(error.message);
                    } else {
                        appendBundleFile(data);
                    };
                });
            };
        });
    };
});

function writeBundleFile(data) {
    fs.writeFile(path.join(__dirname, "project-dist", "bundle.css"), data, "utf-8", (error) => {
        if (error) {
            console.log(error.message);
        };
    });
};
function appendBundleFile(data) {
    fs.appendFile(path.join(__dirname, "project-dist", "bundle.css"), data, "utf-8", (error) => {
        if (error) {
            console.log(error.message);
        };
    });
};

