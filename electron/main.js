const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require("path");
const { ipcMain } = require('electron')
const fs = require('fs')
require('update-electron-app')()

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 350,
        height: 350,
        show: false,
        icon: __dirname+'/data/img/electron.png',
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js'),
        // },
    });
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
app.on('ready', createWindow);