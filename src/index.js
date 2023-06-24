
/* create by create-app-cli */
const { join } = require('path');
const { app, BrowserWindow } = require('electron');

const createWindow = () => {

	const win = new BrowserWindow({
		width: 1100,
		height: 700,
		webPreferences: {
			preload: join(__dirname, 'preload.js'),
			contextIsolation: true,
			// nodeIntegration: true,
		},
	});

	win.loadFile( join( __dirname, 'frontend', 'index.html' ) );
};

app.whenReady()
	.then(() => {
		
		// load the main process events
		require('./events');

		createWindow();

		app.on('activate', () => {
			if ( BrowserWindow.getAllWindows().length === 0 ) {
				createWindow();
			}
		});
	});

app.on('window-all-closed', () => {
	
	if ( process.platform !== 'darwin' ) {
		app.quit();
	}
});
	