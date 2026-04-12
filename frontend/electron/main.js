const { app, BrowserWindow, shell } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let mainWindow;
let backendProcess;

// Start the FastAPI backend automatically using local python env
function startBackend() {
  const isDev = process.env.NODE_ENV === 'development';
  // In dev, backend runs from adjacent folder. In prod, from resources.
  const backendPath = isDev 
    ? path.join(__dirname, '..', '..', 'backend')
    : path.join(process.resourcesPath, 'backend');

  backendProcess = spawn('python', ['-m', 'uvicorn', 'app.main:app',
    '--host', '127.0.0.1', '--port', '8000'], {
    cwd: backendPath,
    windowsHide: true,
  });

  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend stdout: ${data}`);
  });
  
  backendProcess.stderr.on('data', (data) => {
    console.log(`Backend stderr: ${data}`);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    title: 'AI Compliance Platform',
    // icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the Next.js app
  const isDev = process.env.NODE_ENV === 'development';
  mainWindow.loadURL(isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../out/index.html')}`
  );

  // Open external links in browser, not inside the Electron wrapper
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  startBackend();
  // Wait 3 seconds for backend to start
  setTimeout(createWindow, 3000);
});

app.on('before-quit', () => {
  if (backendProcess) backendProcess.kill();
});
