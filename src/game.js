import {CONFIG} from './config.js';
import {createLevel} from './levels.js';
import {makePlayer,stepPlayer,updatePlatforms,stepCollectibles,Camera} from './physics.js';
export class Adventure {
 constructor(store,input,audio,renderer){Object.assign(this,{store,input,audio,renderer,state:'menu',level:null,player:null,camera:new Camera(),listeners:[],effects:[],elapsed:0,accumulator:0});}
 onChange(fn){this.listeners.push(fn);}
 notify(){for(const f of this.listeners)f();}
 screen(state){this.input.clear();this.state=state;this.audio.setActive(state==='playing',this.level?.index||0);this.notify();}
 start(index){if(index<0||index>=this.store.data.unlocked)return false;this.level=createLevel(index);this.player=makePlayer(180,588,this.store.data.character);this.camera.snap(this.player,this.level);this.elapsed=0;this.renderer.particles=[];this.accumulator=0;this.screen('playing');return true;}
 chooseCharacter(id){if(!this.store.chooseCharacter(id))return false;if(this.player)this.player.character=id;this.notify();return true;}
 resume(){if(this.state==='paused')this.screen('playing');}
 pause(){if(this.state==='playing')this.screen('paused');}
 starCount(){return this.level?.stars.filter(s=>s.taken).length||0;}
 superCount(){return this.level?.superStars.filter(s=>s.taken).length||0;}
 collectedSuper(){return this.level.superStars.map(s=>s.taken);}
 event(name,x,y,kind){this.audio.effect(name==='starlet'?'coin':name==='superstar'?'star':name);this.effects.push({name,x,y,time:this.level.time});if(this.effects.length>200)this.effects.shift();
 if(['starlet','superstar','checkpoint','spring','surprise','safe'].includes(name))this.renderer.burst(x,y,name==='starlet'?'coin':name==='superstar'?'star':name);
 if(name==='starlet'||name==='superstar')this.store.collect(this.level.index,this.starCount(),this.collectedSuper());
 if(name==='checkpoint')this.toast('Nowa flaga! Bańka wróci właśnie tutaj.','flag');
 if(name==='superstar')this.toast('Supergwiazdka! Masz już '+this.superCount()+' z 3!','star');
 if(name==='spring')this.toast('Ale wysoko! Strzałka prowadzi po łuku.','sparkle');
 if(name==='surprise')this.toast({butterfly:'Motyle witają się z Tobą!',firefly:'Świetliki rozświetlają drogę!',crab:'Krabik macha na powitanie!',snow:'Śnieżynki tańczą dla Ciebie!',flowers:'Kwiatki mówią: dzień dobry!',penguin:'Pingwinek przesyła uśmiech!',bubbles:'Magiczne bąbelki!',tall_jump:'Trampolina pomoże przeskoczyć wysokie drzewo!',ferry:'Przeprawa: tratwa, podest, tratwa i drugi brzeg!'}[kind]||'Mała niespodzianka!','sparkle');
 if(name==='rescue')this.toast('Magiczna bańka zabiera Cię do flagi.','bubble');}
 toast(text,icon){this.toastData={text,icon,until:performance.now()+3400};this.notify();}
 finish(){if(this.state!=='playing')return;this.store.finish(this.level.index,this.starCount(),this.collectedSuper());this.renderer.burst(this.level.goal,400,'finish');this.audio.effect('finish');this.screen('complete');}
 frame(delta){const dt=Math.min(delta,.1);if(this.input.pause){this.input.pause=false;if(this.state==='playing')this.pause();else if(this.state==='paused')this.resume();else if(['settings','characters'].includes(this.state))this.screen(this.overlayReturnTo||'menu');else if(this.state==='worlds')this.screen('menu');}
 if(this.input.menu){this.input.menu=false;if(this.state==='menu')this.start(this.store.data.finished.every(Boolean)?0:this.store.data.unlocked-1);}
 this.renderer.update(dt);this.audio.update();
 if(this.state==='playing'){this.accumulator+=dt;let first=true;while(this.accumulator>=CONFIG.step){const action=this.input.consume();if(!first)action.jump=false;this.simulate(action,CONFIG.step);first=false;this.accumulator-=CONFIG.step;if(this.state!=='playing')break;}}
 if((this.state==='complete'||this.state==='final')&&Math.floor(this.renderer.time*2)!==Math.floor((this.renderer.time-dt)*2))this.renderer.burst(this.level.goal+(Math.random()-.5)*450,100,'finish');}
 simulate(action,dt){if(this.state!=='playing')return;this.elapsed+=dt;updatePlatforms(this.level,dt);stepPlayer(this.player,this.level,action,dt,(...e)=>this.event(...e));stepCollectibles(this.player,this.level,(...e)=>this.event(...e));this.camera.step(this.player,this.level,dt);if(!this.player.rescue&&this.player.x+this.player.w/2>this.level.goal-30&&this.player.onGround)this.finish();}
}
