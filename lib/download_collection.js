const path = require('path');
const fs = require('fs');
const request = require("request");

// module.exports = (filePath) => {
//     const tempDir = path.join(__dirname, "../../wallpaper");
//     const tempFileName = `temp${Date.now()}.jpg`;
//     const tempFilePath = path.join(tempDir, tempFileName);
//     const writeFileTo = fs.createWriteStream(path.join(tempDir, tempFileName));
//     const getImageFile = request.get(filePath);

//     getImageFile.pipe(writeFileTo);
// };

module.exports = (filePath) => {
    return new Promise((resolve, reject) => {
        const tempDir = __dirname;
        // const tempDir = path.join(__dirname, "../wallpaper");
        const tempFileName = `temp${Date.now()}.jpg`;
        const tempFilePath = path.join(tempDir, tempFileName);
        const writeFileTo = fs.createWriteStream(path.join(tempDir, tempFileName));
        const getImageFile = request.get(filePath);
    
        getImageFile.pipe(writeFileTo);
        getImageFile.on("error", reject);
        getImageFile.on("complete", resolve);
    })
}
