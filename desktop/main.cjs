const {app,BrowserWindow,ipcMain,Menu}=require('electron');
const path=require('node:path');
const fs=require('node:fs');
app.setName('Zwierzaczkowa Przygoda');
const saveDirectory=path.join(app.getPath('appData'),'ZwierzaczkowaPrzygoda');
fs.mkdirSync(saveDirectory,{recursive:true});
app.setPath('userData',saveDirectory);
let win;
app.whenReady().then(()=>{
 Menu.setApplicationMenu(null);
 win=new BrowserWindow({width:1440,height:850,minWidth:960,minHeight:580,title:'Zwierzaczkowa Przygoda',backgroundColor:'#fbf5e6',autoHideMenuBar:true,webPreferences:{preload:path.join(__dirname,'preload.cjs'),nodeIntegration:false,contextIsolation:true,sandbox:true,spellcheck:false}});
 win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 win.webContents.on('will-navigate',e=>e.preventDefault());
 win.loadFile(path.join(__dirname,'index.html'));
 ipcMain.on('quit-game',event=>{if(event.sender===win.webContents)app.quit();});
});
app.on('window-all-closed',()=>app.quit());
