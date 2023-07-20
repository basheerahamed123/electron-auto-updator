const { app, BrowserWindow, dialog, autoUpdater } = require('electron');
const path = require('path');

// Set update feed URL
autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'your-github-username',
  repo: 'your-repo-name',
});

// Check for updates when the app is ready
app.on('ready', () => {
  autoUpdater.checkForUpdates();

  // Listen for update available event
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      message: 'A new update is available. Downloading now...',
    });
  });

  // Listen for update downloaded event
  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      message: 'Update downloaded. It will be installed on the next app restart.',
    });

    // Quit and install the update when the app is closed
    app.on('before-quit', () => {
      autoUpdater.quitAndInstall();
    });
  });

  // Listen for update error event
  autoUpdater.on('error', (error) => {
    console.error('Error checking for updates:', error.message);
  });

  // Create the browser window
  const mainWindow = new BrowserWindow();

  // Load the main HTML file
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // ... additional window configuration ...
});
