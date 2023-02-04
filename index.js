const { app, BrowserWindow } = require('electron')

var production = true;

process.on('unhandledRejection', error => {});

const createWindow = async () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        autoHideMenuBar: true,
        webPreferences: {
            devTools: (production ? false : true),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    mainWindow.loadFile('index.html').catch(err => {});

    (production ? null : mainWindow.webContents.openDevTools())
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})