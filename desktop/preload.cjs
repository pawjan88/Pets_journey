const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('desktop',Object.freeze({quit:()=>ipcRenderer.send('quit-game')}));
