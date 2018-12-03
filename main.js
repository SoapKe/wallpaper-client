// const { app, BrowserWindow } = require('electron');
//
// // 浏览器引用
// let window;
//
// // 创建浏览器窗口函数
// let createWindow = () => {
//     // 创建浏览器窗口
//     window = new BrowserWindow({
//         width: 800,
//         height: 600
//     });
//
//     // 加载应用中的index.html文件
//     window.loadFile('./build/index.html/');
//
//     // 当window被关闭时，除掉window的引用
//     window.on('closed', () => {
//         window = null;
//     });
// };
//
// // 当app准备就绪时候开启窗口
// app.on('ready', createWindow);
//
// // 当全部窗口都被关闭之后推出
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });
//
// // 在macos上，单击dock图标并且没有其他窗口打开的时候，重新创建一个窗口
// app.on('activate', () => {
//     if (window == null) {
//         createWindow();
//     }
// });
const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
// const { spawn } = require("child_process");
// const firebase = require('firebase');
const path = require('path');
const fs = require('fs');
const request = require("request");
const url = require('url');
const upload = require('./lib/upload_function.js');
const { spawn } = require("child_process");


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 900, height: 680, webPreferences: { webSecurity: false}});

    mainWindow.loadURL(`file://${path.join(__dirname, './build/index.html')}`);

    mainWindow.on('closed', () => mainWindow = null);

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)
}

const mainMenuTemplate =  [
    {
        label: 'File',
        submenu:[
            {
                label: "Dev",
                submenu:[
                    {
                        label: 'Toggle DevTools',
                        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                        click(item, focusedWindow){
                            focusedWindow.toggleDevTools();
                        }
                    },
                ]

            },
            {
                label: 'Quit',
                accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            },
            {
                label: 'AutoChanger',
                click(){
                    // AutoChanger();
                }
            }
        ]
    }
];

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// ipcMain.on('upload-image', (event, image) => {
//     upload(image,Uid);
// })

ipcMain.on('download-image', (event, filePath) => {
    return new Promise((resolve, reject) => {
      const tempDir = path.join(__dirname, "../wallpaper-client");
      const tempFileName = `temp${Date.now()}.jpg`;
      const tempFilePath = path.join(tempDir, tempFileName);
      const writeFileTo = fs.createWriteStream(path.join(tempDir, tempFileName));
      const getImageFile = request.get(filePath);
  
      getImageFile.pipe(writeFileTo);
      getImageFile.on("error", reject);
      getImageFile.on("complete", () => {
        // Image has been saved to tempFilePath
        // Change desktop background using applescript
        const script = spawn("osascript", [
          "-e",
          `tell application "Finder" to set desktop picture to POSIX file "${tempFilePath}"`
        ]);
        script.on("close", resolve);
      });
    })
  })