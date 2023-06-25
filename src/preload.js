const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    createSnippet: async (nameFile) => await ipcRenderer.invoke('create-snippet', nameFile),
    readDir: async () => await ipcRenderer.invoke('read-dir'),
    saveSnippet: async (nameFile, content) => await ipcRenderer.invoke('save-snippet', nameFile, content), 
    readSnippet: async (nameFile) => await ipcRenderer.invoke('read-snippet', nameFile),
    deleteSnippet: async (nameFile) => await ipcRenderer.invoke('delete-snippet', nameFile),
});
