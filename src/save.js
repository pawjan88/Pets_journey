import {CONFIG,CHARACTERS} from './config.js';
export class SaveStore {
 constructor(storage){this.storage=storage;this.warning=false;this.data=this.defaults();this.load();}
 defaults(){return {version:2,unlocked:1,finished:[false,false,false,false],superStars:Array.from({length:4},()=>[false,false,false]),best:[0,0,0,0],character:'fox',settings:{music:.32,sfx:.55,musicOn:true,sfxOn:true}};}
 load(){try{const raw=this.storage.getItem(CONFIG.saveKey);if(raw)this.data=this.validate(JSON.parse(raw));}catch{this.warning=true;}}
 validate(v){const d=this.defaults();if(!v||![1,2].includes(v.version))return d;
 for(let i=0;i<4;i++){d.finished[i]=v.finished?.[i]===true;d.best[i]=v.version===2?Math.max(0,Math.min(40,Math.floor(Number(v.best?.[i])||0))):0;
  for(let j=0;j<3;j++)d.superStars[i][j]=v.version===1?(j===0&&v.stars?.[i]===true):v.superStars?.[i]?.[j]===true;}
 let earned=1;for(let i=0;i<3&&d.finished[i];i++)earned=i+2;d.unlocked=earned;
 if(CHARACTERS.some(c=>c.id===v.character))d.character=v.character;
 for(const k of ['music','sfx'])if(Number.isFinite(v.settings?.[k]))d.settings[k]=Math.max(0,Math.min(1,v.settings[k]));
 for(const k of ['musicOn','sfxOn'])if(typeof v.settings?.[k]==='boolean')d.settings[k]=v.settings[k];return d;}
 write(){try{this.storage.setItem(CONFIG.saveKey,JSON.stringify(this.data));this.warning=false;}catch{this.warning=true;}}
 collect(level,count,superStars){this.data.best[level]=Math.max(this.data.best[level],count);for(let i=0;i<3;i++)this.data.superStars[level][i]||=superStars[i]===true;this.write();}
 finish(level,count,superStars){this.data.finished[level]=true;this.data.unlocked=Math.max(this.data.unlocked,Math.min(4,level+2));this.collect(level,count,superStars);}
 chooseCharacter(id){if(!CHARACTERS.some(c=>c.id===id))return false;this.data.character=id;this.write();return true;}
 export(){return JSON.stringify(this.data,null,2);}
 import(text){const v=JSON.parse(text);if(![1,2].includes(v.version)||!Array.isArray(v.finished)||v.finished.length!==4)throw Error('Nieprawidłowy plik zapisu.');this.data=this.validate(v);this.write();}
}
