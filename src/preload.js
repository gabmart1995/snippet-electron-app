const { contextBridge, ipcRenderer } = require('electron');

/**
 * @typedef {Object} Api
 * @type {Object}
 * @property {(nameFile: string) => Promise<void>} createSnippet
 * @property {() => Promise<Array<string>>} readDir
 * @property {(nameFile: string, content: string) => Promise<void>} saveSnippet
 * @property {(nameFile: string) => Promise<string>} readSnippet
 * @property {(nameFile: string) => Promise<string>} deleteSnippet
 */

/** @type {Api} */
const api = Object.freeze({
    createSnippet: async (nameFile) => await ipcRenderer.invoke('create-snippet', nameFile),
    readDir: async () => await ipcRenderer.invoke('read-dir'),
    saveSnippet: async (nameFile, content) => await ipcRenderer.invoke('save-snippet', nameFile, content), 
    readSnippet: async (nameFile) => await ipcRenderer.invoke('read-snippet', nameFile),
    deleteSnippet: async (nameFile) => await ipcRenderer.invoke('delete-snippet', nameFile),
});

contextBridge.exposeInMainWorld('api', api);