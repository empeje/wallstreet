// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow } = require('electron');
const { DEBUG, RUNTIME } = require('./config');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (RUNTIME === 'elm') {
    win.loadFile('./dist/elm/index.html');
  } else {
    win.loadFile('./dist/js/index.html');
  }

  if (DEBUG === 'true') {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
