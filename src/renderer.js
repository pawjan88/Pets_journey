import {PROP_ROOTS,POLISH_PROPS,POLISH_PLATFORMS} from './art-metadata.js';
import {stableGround,groundedProp} from './presentation.js';
import {THEMES} from './config.js';
import {ellipse,path,round,stroke,star,flower,butterfly,cloud,tree,palm,mushroom,shell,snowman,friend,fox} from './art.js';
const TAU=Math.PI*2;
function rand(n){return ((Math.sin(n*127.13+311.7)*43758.5453)%1+1)%1;}
export class WorldRenderer {
 constructor(){this.particles=[];this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;this.time=0;this.texture=this.paper();}
 paper(){const cv=document.createElement('canvas');cv.width=cv.height=180;const c=cv.getContext('2d');for(let i=0;i<2200;i++){c.fillStyle=i%2?'rgba(255,255,255,.07)':'rgba(68,81,61,.025)';c.fillRect(rand(i)*180,rand(i+1)*180,1,1);}return cv;}
 burst(x,y,kind){const count=kind==='star'?34:kind==='finish'?100:kind==='surprise'?24:12;for(let i=0;i<count;i++){const angle=rand(i*2+this.time)*TAU;this.particles.push({x,y,vx:Math.cos(angle)*(35+rand(i+7)*100),vy:Math.sin(angle)*100-60,life:1+rand(i+2),max:2,size:3+rand(i+9)*6,color:['#eab684','#b49bc6','#f2d17b','#8fb7a1','#f5d7ba'][i%5],kind});}}
 update(dt){this.time+=dt;for(const p of this.particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=60*dt;p.life-=dt;}this.particles=this.particles.filter(p=>p.life>0);}
 character(c,x,y,s,face,state,t){
 if(!this.artwork){fox(c,x,y,s,face,state,t);return;}
 let frame=0,angle=0,sx=1,sy=1,bob=Math.sin(t*2.5)*.7;
 if(state==='walk'){frame=Math.floor(t*11)%8;bob=0;}
 if(state==='jump'){frame=2;angle=-.06;sy=1.025;}
 if(state==='fall'){frame=6;angle=.04;}
 if(state==='land'){frame=0;sx=1.08;sy=.92;}
 if(state==='collect'){frame=1;sx=1.025;sy=1.025;bob=-3;}
 if(state==='happy'){frame=[0,2,4,6][Math.floor(t*6)%4];bob=-Math.abs(Math.sin(t*5))*13;}
 c.save();c.translate(x,y+bob);c.scale(s*face*sx,s*sy);c.rotate(angle);
 const h=114,w=h*384/448;c.drawImage(this.artwork.characters?.[this.characterId]||this.artwork.fox,frame*384,0,384,448,-w/2,-h*434/448,w,h);c.restore();
 }
 prop(c,name,x,y,height,t=0,scaleX=1){if(!this.artwork)return;const root=PROP_ROOTS[name],n=root.frame,scale=height/448;c.save();c.translate(x,y);c.scale(scaleX,1);if(name==='flowers')c.rotate(Math.sin(t+x)*.025);if(name==='penguin'||name==='hedgehog')c.rotate(Math.sin(t*2+x)*.018);c.drawImage(this.artwork.props,(n%4)*384,Math.floor(n/4)*448,384,448,-root.anchorX*scale,-root.anchorY*scale,384*scale,height);c.restore();}
 polishProp(c,name,x,y,height,rotation=0){const f=POLISH_PROPS[name];if(!this.artwork?.polishProps)return;const scale=height/f.height;c.save();c.translate(x,y);c.rotate(rotation);c.drawImage(this.artwork.polishProps,f.x,f.y,f.width,f.height,-f.anchor[0]*scale,-f.anchor[1]*scale,f.width*scale,height);c.restore();}

 background(c,index,camera,t,vertical=0){if(this.reduced)t=0;const th=THEMES[index];
 if(this.artwork){const im=this.artwork.backgrounds[index],offset=Math.min(160,Math.max(0,camera*.0067));c.drawImage(im,-offset,-70-vertical*.08,1440,810);
 c.save();c.globalAlpha=.8;for(let i=0;i<(index===3?35:12);i++){const x=(i*97+t*(index===3?7:3))%1280,y=(i*47+t*(index===3?14:-2)+900)%600;ellipse(c,x,y,index===3?1.6:1,index===3?1.6:1,index===1?'#ffed83':'#fffad9');}c.restore();return;}
const bg=c.createLinearGradient(0,0,0,620);bg.addColorStop(0,th.sky);bg.addColorStop(1,th.horizon);c.fillStyle=bg;c.fillRect(0,0,1280,720);
 // A warm sun or soft winter moon.
 ellipse(c,1050-camera*.008,114,70,70,'#fff1c2');ellipse(c,1050-camera*.008,114,54,54,'#f5db9e');ellipse(c,1036-camera*.008,116,2.3,3,'#b29a64');ellipse(c,1062-camera*.008,116,2.3,3,'#b29a64');stroke(c,'#c3aa75',2,c=>{c.arc(1049-camera*.008,119,10,.2,Math.PI-.2);});
 for(let i=-1;i<5;i++){const x=i*390-(camera*.045+t*2)%390;cloud(c,x+100,90+rand(i+3)*110,.55+rand(i+2)*.4,.55);}
 if(index===3){for(let i=-1;i<6;i++){const x=i*340-(camera*.1)%340;path(c,th.far,[[x-180,510],[x+80,185+rand(i)*75],[x+350,510]]);path(c,'#edf1f6',[[x-13,304],[x+80,185+rand(i)*75],[x+176,315],[x+115,287],[x+68,320],[x+31,288]]);}}
 else if(index===2){c.fillStyle=th.far;c.fillRect(0,335,1280,210);for(let i=0;i<10;i++){const y=363+i*14;stroke(c,'rgba(244,250,235,.45)',2,c=>{for(let x=-80;x<1400;x+=30){const wy=y+Math.sin(x*.012+t+i)*3;if(x===-80)c.moveTo(x,wy);else c.lineTo(x,wy);}});}for(let i=-1;i<4;i++){const x=i*540-(camera*.12)%540;ellipse(c,x+100,430,170,55,'#b9ceaa');ellipse(c,x+115,400,120,27,'#d9d7b0');palm(c,x+132,408,.6,t);}}
 else{for(let layer=0;layer<2;layer++){const base=430+layer*70;const offset=camera*(.08+layer*.08);c.fillStyle=layer?th.hill:th.far;c.beginPath();c.moveTo(-100,720);for(let x=-100;x<=1400;x+=30){const y=base+Math.sin((x+offset)*.004+layer)*45+Math.sin((x+offset)*.008)*13;c.lineTo(x,y);}c.lineTo(1400,720);c.closePath();c.fill();}
 if(index===1){for(let i=-1;i<9;i++){const x=i*210-(camera*.2)%210;c.save();c.globalAlpha=.45;tree(c,x,492,.9+rand(i)*.3,1,t);c.restore();}}}
 // Middle-distance shrubs or coastal dunes.
 for(let i=-1;i<9;i++){const x=i*210-(camera*.28)%210;if(index!==2){ellipse(c,x,557,150,43,index===3?'#cadbe4':'#b0c8a0');}else ellipse(c,x,569,180,46,'#ead5a5');}
 if(index===1){for(let i=0;i<16;i++){ellipse(c,(i*89+t*3)%1280,300+Math.sin(t*.8+i)*35+rand(i)*190,2.2,2.2,'#f8e5a4');}}
 if(index===3){c.save();c.globalAlpha=.6;for(let i=0;i<40;i++){ellipse(c,(i*73+Math.sin(t*.4+i)*22)%1280,(i*39+t*13)%600,1.5,1.5,'#fffdfa');}c.restore();}}
 ground(c,b,index,t){const th=THEMES[index];const earth=c.createLinearGradient(0,b.y,0,b.y+b.h);earth.addColorStop(0,th.soil);earth.addColorStop(1,index===3?'#6b9fc8':index===2?'#bd7e3d':'#815331');round(c,b.x,b.y+6,b.w,b.h,12,earth);c.save();c.beginPath();c.rect(b.x,b.y,b.w,b.h);c.clip();for(let i=Math.floor(Math.max(b.x,this.viewLeft||0)/52);i<Math.min(b.x+b.w,(this.viewLeft||0)+1300)/52+1;i++){const x=i*52;ellipse(c,x+10,b.y+67+rand(i)*20,10+rand(i+3)*6,5,'rgba(137,108,83,.10)');ellipse(c,x+25,b.y+122+rand(i+1)*22,15,6,'rgba(255,255,238,.13)');}c.restore();round(c,b.x,b.y,b.w,19,9,th.edge);const turf=c.createLinearGradient(0,b.y-7,0,b.y+20);turf.addColorStop(0,index===3?'#fff':index===2?'#ffe6a3':'#b3ed50');turf.addColorStop(.42,th.grass);turf.addColorStop(1,th.edge);round(c,b.x,b.y-5,b.w,16,8,turf);if(this.artwork?.terrain){c.save();c.beginPath();c.rect(b.x,b.y-10,b.w,b.h+10);c.clip();const tw=256;for(let x=Math.floor(Math.max(b.x,this.viewLeft||0)/tw)*tw;x<Math.min(b.x+b.w,(this.viewLeft||0)+1300);x+=tw){c.drawImage(this.artwork.terrain,index*512+40,0,432,512,x,b.y-10,tw,tw);for(let yy=b.y+246;yy<Math.min(b.y+b.h,(this.viewTop||0)+740);yy+=150)c.drawImage(this.artwork.terrain,index*512+40,220,432,285,x,yy,tw,150);}c.restore();}else{for(let x=Math.ceil(b.x/38)*38;x<b.x+b.w;x+=38)ellipse(c,x,b.y+10,18,8,th.grass);}if(index<2){for(let x=Math.ceil(Math.max(b.x,this.viewLeft||0)/12)*12;x<Math.min(b.x+b.w,(this.viewLeft||0)+1300);x+=12){stroke(c,x%24?'#6ab72a':'#b6ec51',1.5,c=>{c.moveTo(x,b.y+1);c.lineTo(x+Math.sin(x)*4,b.y-8-rand(x)*6);});}}if(index===2){for(let x=Math.ceil(Math.max(b.x,this.viewLeft||0)/150)*150;x<Math.min(b.x+b.w,(this.viewLeft||0)+1300);x+=150){ellipse(c,x+20,b.y+40,2,1,'#c7a46f');ellipse(c,x+28,b.y+43,2,1,'#c7a46f');}}}
 platform(c,p,index,t){
 const wood=index===2||p.kind==='raft'||p.kind==='water-center';
 if(wood&&this.artwork?.polishPlatforms){const f=POLISH_PLATFORMS[p.kind==='raft'||p.kind==='water-center'?'raft':'beach_platform'],scale=p.w/(f.surfaceRight-f.surfaceLeft);c.drawImage(this.artwork.polishPlatforms,f.x,f.y,f.width,f.height,p.x-f.surfaceLeft*scale,p.y-f.surfaceY*scale,f.width*scale,f.height*scale);return;}
 const th=THEMES[index];ellipse(c,p.x+p.w*.5,p.y+48,p.w*.48,7,'rgba(56,78,59,.10)');
 if(this.artwork?.terrain){c.save();c.beginPath();c.roundRect(p.x,p.y-4,p.w,60,10);c.clip();c.drawImage(this.artwork.terrain,index*512+40,0,432,512,p.x,p.y-4,p.w,90);c.restore();}
 else{round(c,p.x,p.y,p.w,40,12,th.soil);round(c,p.x-2,p.y-4,p.w+4,12,6,th.grass);}
 }

 spring(c,s,index,t){
 const f=POLISH_PROPS.trampoline,compression=1-(s.squash>0?Math.sin(s.squash/.4*Math.PI)*.16:0),sx=s.w/(f.surfaceRight-f.surfaceLeft),sy=((s.groundY??588)-s.y)/(f.anchor[1]-f.surfaceY)*compression;
 if(this.artwork?.polishProps)c.drawImage(this.artwork.polishProps,f.x,f.y,f.width,f.height,s.x-f.surfaceLeft*sx,(s.groundY??588)-f.anchor[1]*sy,f.width*sx,f.height*sy);
 }

 checkpoint(c,cp,active,index,t){if(cp.hidden)return;this.polishProp(c,active?'flag_active':'flag_idle',cp.x,cp.y+2,156);if(active){c.save();c.globalAlpha=.3+.12*Math.sin(t*2);ellipse(c,cp.x+3,cp.y-106,15,15,'#ffed96');c.restore();}}

 goal(c,x,t,index){c.save();c.translate(x,588);ellipse(c,0,1,105,14,'rgba(51,86,65,.12)');round(c,-89,-140,18,140,9,'#f7e9cc');round(c,71,-140,18,140,9,'#f7e9cc');stroke(c,'#729f8d',23,c=>{c.moveTo(-82,-135);c.bezierCurveTo(-82,-248,82,-248,82,-135);});stroke(c,'#a8c7a2',8,c=>{c.moveTo(-82,-135);c.bezierCurveTo(-82,-248,82,-248,82,-135);});for(let i=0;i<7;i++){const a=Math.PI+i*Math.PI/6;const xx=Math.cos(a)*85,yy=-135+Math.sin(a)*84;ellipse(c,xx,yy,9,5,['#e4b19a','#f0d18c','#b9aecb'][i%3]);}star(c,0,-226,23,'#f2ce7c');ellipse(c,-5,-231,3,2,'#fff2c3');round(c,-56,-158,112,31,12,'#fcf1db');c.font='800 17px Nunito';c.textAlign='center';c.fillStyle='#547d6a';c.fillText('META',0,-137);for(const sign of[-1,1]){ellipse(c,sign*117,-194+Math.sin(t+sign)*5,17,23,sign<0?'#dca99e':'#b5a6c5');stroke(c,'#b4a68b',1,c=>{c.moveTo(sign*117,-171+Math.sin(t+sign)*5);c.quadraticCurveTo(sign*105,-124,sign*110,-70);});}c.restore();}
 floorY(x){return this.levelForDraw?.terrain.find(b=>x>=b.x&&x<b.x+b.w)?.y??null;}
 backgroundAnimal(c,id,x,y,scale,t){const previous=this.characterId;this.characterId=id;this.character(c,x,y,scale,1,'idle',t);this.characterId=previous;}
 decoration(c,x,index,t){
 const n=Math.floor(x/320),plant=(name,dx,height)=>{if(height>=100&&this.levelForDraw?.springs.some(s=>Math.abs(x+dx-(s.x+s.w/2))<260))return;const p=groundedProp(this.levelForDraw,name,x+dx,height);if(p)this.prop(c,name,p.x,p.y,height,t);},at=(dx,width,fn)=>{if(width>=30&&this.levelForDraw?.springs.some(s=>Math.abs(x+dx-(s.x+s.w/2))<250))return;const y=stableGround(this.levelForDraw,x+dx,width);if(y!==null)fn(x+dx,y);};
 if(index===0){if(n%5===0)plant('tree',60,240);plant('flowers',210,55+rand(n)*25);if(n%6===2)at(90,34,(xx,yy)=>this.backgroundAnimal(c,'hamster',xx,yy,1.22,t));if(n%4===1)at(100,5,(xx,yy)=>butterfly(c,xx+Math.sin(t)*15,yy-135+Math.cos(t)*8,1.2,t,'#ffbf39'));}
 if(index===1){if(n%4===0)plant('tree',40,290);plant('mushroom',185,76+rand(n)*30);if(n%5===1)plant('hedgehog',90,105);if(n%8===3)at(80,34,(xx,yy)=>this.backgroundAnimal(c,'rabbit',xx,yy,1.22,t));}
 if(index===2){if(n%4===0)plant('palm',50,240);plant('shell',190,37);if(n%4===2)at(100,80,(xx,yy)=>this.polishProp(c,'crab',xx+Math.sin(t*.8)*6,yy,145,Math.sin(t*2)*.025));}
 if(index===3){if(n%5===1)plant('snowman',80,145);if(n%5===3)plant('penguin',80,135);}
 }

 regularStar(c,s,t){const y=s.y+Math.sin(t*2+s.id)*3;ellipse(c,s.x,y+1,22,22,'rgba(255,221,96,.15)');const gold=c.createLinearGradient(s.x-13,y-16,s.x+13,y+17);gold.addColorStop(0,'#fff8b0');gold.addColorStop(.4,'#ffdf57');gold.addColorStop(1,'#df9515');star(c,s.x,y,17,gold,Math.sin(t*.8)*.05);stroke(c,'#dba01b',1.2,c=>{c.moveTo(s.x,y-17);c.lineTo(s.x+5,y-6);});ellipse(c,s.x-4,y-6,3,2,'#fffbd0');}
 superStar(c,s,t){const y=s.y+Math.sin(t*1.8)*4;ellipse(c,s.x,y,47,47,'rgba(255,203,60,.17)');ellipse(c,s.x,y,34,34,'rgba(255,247,167,.25)');star(c,s.x,y+2,32,'#d98b27',Math.sin(t)*.08);const shine=c.createLinearGradient(0,y-28,0,y+30);shine.addColorStop(0,'#fff8bd');shine.addColorStop(.4,'#ffdc47');shine.addColorStop(1,'#efa729');star(c,s.x,y,30,shine,Math.sin(t)*.08);ellipse(c,s.x-7,y-10,5,3,'#fffde7');for(let i=0;i<4;i++)star(c,s.x+Math.cos(t+i*1.57)*44,y+Math.sin(t+i*1.57)*39,3,'#fff0a3');}

 draw(c,model){
 const {state,level,player,camera}=model;this.characterId=model.store?.data.character||player?.character||'fox';this.levelForDraw=level;
 const index=level?.index||0,t=this.time,cam=camera.x,camY=camera.y||0;this.viewLeft=cam;this.viewTop=camY;
 this.background(c,index,state==='menu'?0:cam,t,camY);
 if(['menu','exit','characters'].includes(state)){
  this.viewLeft=0;this.ground(c,{x:0,y:610,w:1280,h:170},0,t);this.prop(c,'flowers',750,610,85,t);this.prop(c,'flowers',1140,610,95,t);ellipse(c,940,585,110,18,'rgba(62,92,66,.15)');this.character(c,940,583,2.15,1,'idle',t);
  butterfly(c,1050+Math.sin(t)*16,330+Math.cos(t)*10,1.1,t);star(c,807,277,7,'#ffdf79');const fog=c.createLinearGradient(0,0,850,0);fog.addColorStop(0,'rgba(252,247,233,.97)');fog.addColorStop(.55,'rgba(252,247,233,.92)');fog.addColorStop(1,'rgba(252,247,233,0)');c.fillStyle=fog;c.fillRect(0,0,900,720);
 }else if(level){
  c.save();c.translate(-cam,-camY);
  for(const [a,b]of level.gaps){const surface=a===level.water?.x?level.water.surface:645;const water=c.createLinearGradient(0,surface,0,surface+230);water.addColorStop(0,'#85e2e2');water.addColorStop(.3,'#35b9ce');water.addColorStop(1,'#378eb7');round(c,a-4,surface,b-a+8,240,12,water);for(let i=0;i<5;i++)stroke(c,'rgba(255,255,255,.48)',2,c=>{const yy=surface+13+i*21;c.moveTo(a+10,yy);for(let xx=a+30;xx<b;xx+=35)c.lineTo(xx,yy+Math.sin(t*1.4+xx*.025+i)*3);});
   if(a>cam-100&&a<cam+1380){stroke(c,'#e0b35a',4,c=>{c.moveTo(a-75,574);c.quadraticCurveTo(a-24,555,a+24,565);c.lineTo(a+15,556);c.moveTo(a+24,565);c.lineTo(a+10,568);});}}
  for(let x=Math.floor((cam-200)/320)*320;x<cam+1500;x+=320)this.decoration(c,x,index,t);
  for(const b of level.terrain)if(b.x+b.w>cam-50&&b.x<cam+1330)this.ground(c,b,index,t);
  for(const p of [...level.platforms,...level.moving])if(p.x+p.w>cam-50&&p.x<cam+1330)this.platform(c,p,index,t);
  for(const o of level.obstacles||[])if(o.rootX>cam-300&&o.rootX<cam+1550)this.prop(c,o.kind,o.rootX,o.baseY,o.artHeight,t,o.artScaleX);
  for(const s of level.springs)if(Math.abs(s.x-cam-640)<800)this.spring(c,s,index,t);
  for(let i=0;i<level.checkpoints.length;i++){const cp=level.checkpoints[i];if(!cp.hidden&&cp.x>cam-100&&cp.x<cam+1380)this.checkpoint(c,cp,i<=level.checkpoint,index,t);}
  for(const s of level.stars)if(!s.taken&&s.x>cam-60&&s.x<cam+1340)this.regularStar(c,s,t);
  for(const s of level.superStars)if(!s.taken&&s.x>cam-80&&s.x<cam+1360)this.superStar(c,s,t);
  if(level.goal>cam-200&&level.goal<cam+1480)this.goal(c,level.goal,t,index);
  if(player){const px=player.x+player.w/2,py=player.y+player.h,ground=this.floorY(px);if(ground!==null)ellipse(c,px,ground+3,25,5,'rgba(33,66,43,.16)');this.character(c,px,py,1,player.face,['complete','final'].includes(state)?'happy':player.anim,t);
   if(player.rescue){const g=c.createRadialGradient(px-12,py-55,2,px,py-42,65);g.addColorStop(0,'rgba(255,255,255,.08)');g.addColorStop(1,'rgba(171,222,242,.5)');ellipse(c,px,py-44,62,67,g);stroke(c,'rgba(255,255,255,.85)',3,c=>c.ellipse(px,py-44,62,67,0,0,TAU));stroke(c,'rgba(255,255,255,.9)',4,c=>c.arc(px,py-44,51,3.5,4.25));}}
  for(const p of this.particles){if(p.x<cam-50||p.x>cam+1330)continue;c.save();c.globalAlpha=Math.min(1,p.life);if(p.kind==='coin'||p.kind==='star')star(c,p.x,p.y,p.size,p.color,this.time);else{c.translate(p.x,p.y);c.rotate(this.time*2+p.x);round(c,-p.size/2,-p.size/2,p.size,p.size*.55,2,p.color);}c.restore();}c.restore();
 }
 c.save();c.globalAlpha=.06;c.fillStyle=c.createPattern(this.texture,'repeat');c.fillRect(0,0,1280,720);c.restore();
 }
 characterThumbnail(id){const cv=document.createElement('canvas');cv.width=384;cv.height=448;const c=cv.getContext('2d'),old=this.characterId;this.characterId=id;this.character(c,192,434,3.6,1,'idle',0);this.characterId=old;return cv.toDataURL();}

 thumbnail(index){const cv=document.createElement('canvas');cv.width=640;cv.height=360;const c=cv.getContext('2d');if(this.artwork)c.drawImage(this.artwork.backgrounds[index],0,0,640,360);else{c.scale(.5,.5);this.background(c,index,0,1);}return cv.toDataURL();}
 atlas(){const states=['idle','walk','jump','fall','land','collect','happy'],cv=document.createElement('canvas');cv.width=160*8;cv.height=160*states.length;const c=cv.getContext('2d');for(let row=0;row<states.length;row++)for(let col=0;col<8;col++)this.character(c,col*160+85,row*160+142,1.2,1,states[row],col/8*(states[row]==='walk'?TAU/11:TAU/5));return {png:cv.toDataURL(),states,frameWidth:160,frameHeight:160,columns:8,anchor:[.53125,.8875]};}
}
