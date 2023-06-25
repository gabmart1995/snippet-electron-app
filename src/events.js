const path = require('path');
const { existsSync, promises: fsPromises } = require('fs'); // promises mode

const { ipcMain } = require('electron');

// path's
const desktopPath = require('os').homedir();
const pathDirectory = path.resolve(desktopPath, 'electronfiles'); 

// handlers
ipcMain.handle('create-snippet', async (_, nameFile) => {
    const pathFile = path.resolve(pathDirectory, nameFile);

    if (!existsSync(pathDirectory)) { // verifica si no existe la carpeta
        try {
            await fsPromises.mkdir(pathDirectory);
            
        } catch (error) {
            throw new Error('Error de permisos de escritura');
        
        }
    }

    // escribimos el archivo
    try {
        await fsPromises.writeFile(pathFile, '');
        
    } catch (error) {
        throw new Error('Error al crear archivo');
    }
});  

ipcMain.handle('read-dir', async () => { 
    try {
        const files = await fsPromises.readdir(pathDirectory);

        // mapeamos el listado de los nombres para anadir el path
        // y lo retornamos
        return files.map(file => {
            return {
                name: file,
                path: path.resolve(pathDirectory, file)
            };
        });
        
    } catch (error) {
        console.error(error);
    }
});

ipcMain.handle('save-snippet', async (_, nameFile, content) => {
    const pathFile = path.resolve(pathDirectory, nameFile);
    
    try {
        await fsPromises.writeFile(pathFile, content);
        console.log('save succesfully');

    } catch (error) {
        console.error(error);
    
    }
});

ipcMain.handle('read-file', async (_, nameFile) => {
    const pathFile = path.resolve(pathDirectory, nameFile);
    
    try {
        return await fsPromises.readFile(pathFile, { encoding: 'utf-8' });

    } catch (error) {
        console.error(error);
    
    }
});

