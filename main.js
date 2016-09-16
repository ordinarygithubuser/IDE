import { app, BrowserWindow, Menu } from 'electron';
import ElectronDebug from 'electron-debug';

ElectronDebug();

let mainWindow = null;

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit();
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        'frame': false,
        'width': 1500,
        'height': 850,
        'min-width': 1050,
        'min-height': 400
    });

    mainWindow.loadURL(`file://${__dirname}/src/app.html`);

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on('closed', () => {
        mainWindow = null
    });

    mainWindow.openDevTools();
});