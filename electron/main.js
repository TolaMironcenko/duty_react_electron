const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require("path");
const { ipcMain } = require('electron')
const fs = require('fs')
// require('update-electron-app')()

const createWindow = () => {
    console.log(path.join(__dirname, 'preload.js'))
    let window = new BrowserWindow({
        width: 350,
        height: 350,
        show: false,
        icon: __dirname+'/data/img/electron.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    window.setMenuBarVisibility(false)

    ipcMain.handle('get_balance', () => {
        return fs.readFileSync(__dirname+'/data/balance', 'utf-8')
    })
    ipcMain.handle('get_transactions', () => {
        return fs.readFileSync(__dirname+'/data/transactions', 'utf-8')
    })
    ipcMain.on('add_transaction', (event, sum) => {
        let balance = fs.readFileSync(__dirname+'/data/balance', 'utf-8')
        fs.writeFileSync(__dirname+'/data/balance', (parseFloat(balance)+parseFloat(sum)).toString())
        fs.appendFileSync(__dirname+'/data/transactions', '\n'+sum.toString())
    })

    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    window.loadURL(startURL);

    window.once('ready-to-show', () => window.show());
    window.on('closed', () => {
        window = null;
    });
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    app.quit()
})
