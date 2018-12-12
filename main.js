const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const path = require('path');
const fs = require('fs');
const request = require("request");
// const url = require('url');
const AutoChanger = require('./src/lib/autoChanger.js');
const Download = require('./src/lib/download_collection');
const { spawn } = require("child_process");

const sleep = time => new Promise(r => setTimeout(r, time));

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
                        accelerator:process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
                        click(item, focusedWindow){
                            focusedWindow.toggleDevTools();
                        }
                    },
                ]

            },
            {
                label: 'Quit',
                accelerator:process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
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

ipcMain.on('download-image', (event, filePath) => {
    return new Promise((resolve, reject) => {
      const tempDir = path.join(__dirname, "../wallpaper-client/wallpaper");
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
  });

ipcMain.on('change_period', (event,fre,msr) =>{ 
    AutoChanger("every "+fre+" "+msr);
});

ipcMain.on('download_all', (event, urls) =>{
    console.log(urls);
    for(var i = 0; i < urls.length; i++){
        // Download(urls[i]);
        setTimeout(() => {
            Download(urls[i])
            console.log(urls[i])
        }, 2000);
    }
    // urls.forEach((url) => {
    //     setTimeout(() => {
    //         Download(url)
    //         console.log(url)
    //     }, 5000);
    //     // sleep(1000).then(Download(url));
    // });
});