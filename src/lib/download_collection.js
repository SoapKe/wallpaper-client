const path = require('path');
const fs = require('fs');
const request = require("request");

let filePath = 'https://res.cloudinary.com/candong/image/upload/v1543956768/imao4licytlzpsas4ily.jpg'
const tempDir = path.join(__dirname, "../wallpaper");
const tempFileName = `temp${Date.now()}.jpg`;
const tempFilePath = path.join(tempDir, tempFileName);
const writeFileTo = fs.createWriteStream(path.join(tempDir, tempFileName));
const getImageFile = request.get(filePath);

getImageFile.pipe(writeFileTo);