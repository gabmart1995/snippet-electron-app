const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('api', {
    createSnippet: async (nameFile) => await ipcRenderer.invoke('create-snippet', nameFile),
    readDir: async () => {
        try {
            return await ipcRenderer.invoke('read-dir');
            
        } catch (error) {
            console.error(error);

        }
    },
});
