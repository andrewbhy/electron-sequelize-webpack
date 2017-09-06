import { app, BrowserWindow, ipcMain } from 'electron';
import Sequelize from 'sequelize'
//import IPCServer from './IPCServer'  //uglify plugin throws error when processing electron-ipc-server

import { setupAPI } from './API'

let electron = require('electron')

const path = require('path')
const url = require('url')

let mainWindow = null;

let createWindow = () => {

    mainWindow = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            nodeIntegrationInWorker: true,
            webSecurity: false //allow loading local resource index.html
        }

    })

    if (process.env.DevServer == true || process.env['process.env.DevServer'] == true) {

        console.log("using devserver")
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();

    } else {
        console.log(path.resolve(__dirname, 'index.html'), path.join(__dirname, 'index.html'))
        mainWindow.loadURL(url.format({
            pathname: path.resolve(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }

    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })



}

let initialize = () => {

    setupAPI();

    createWindow();

}


app.on('ready', initialize);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});
