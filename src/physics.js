import {CONFIG} from './config.js';
import {platformPose} from './levels.js';
export function overlaps(a,b){return a.x+a.w>b.x&&a.x<b.x+b.w&&a.y+a.h>b.y&&a.y<b.y+b.h;}
export function makePlayer(x=180,y=588,character='fox'){return {character,x,y:y-CONFIG.playerH,w:CONFIG.playerW,h:CONFIG.playerH,vx:0,vy:0,face:1,onGround:true,coyote:CONFIG.coyote,buffer:0,airDirection:0,ground:null,springFlight:false,springAirSpeed:190,anim:'idle',land:0,collect:0,rescue:null};}
export function updatePlatforms(level,dt){level.time+=dt;
 for(const p of level.moving){const ox=p.x,oy=p.y,pose=platformPose(p,level.time);p.x=pose.x;p.y=pose.y;p.dx=p.x-ox;p.dy=p.y-oy;}
 for(const s of level.stars)if(s.platformId){const p=level.moving.find(p=>p.id===s.platformId);if(p){s.x=p.x+s.offsetX;s.y=p.y+s.offsetY;}}
 for(const s of level.springs){s.cooldown=Math.max(0,s.cooldown-dt);s.squash=Math.max(0,s.squash-dt);}}

export function beginRescue(p,l){const cp=l.checkpoints[l.checkpoint];p.rescue={time:0,x:Number.isFinite(p.x)?p.x:cp.x,y:Number.isFinite(p.y)?Math.min(p.y,820):cp.y-p.h,tx:cp.x,ty:cp.y-p.h};p.vx=0;p.vy=0;p.buffer=0;p.ground=null;p.springFlight=false;}
export function stepPlayer(p,l,input,dt,emit=()=>{}){
 p.land=Math.max(0,p.land-dt);p.collect=Math.max(0,p.collect-dt);
 if(p.rescue){const r=p.rescue;r.time+=dt;let t=Math.min(1,r.time/CONFIG.rescueTime);t=t*t*(3-2*t);p.x=r.x+(r.tx-r.x)*t;p.y=r.y+(r.ty-r.y)*t-Math.sin(Math.PI*t)*130;if(r.time>=CONFIG.rescueTime){p.x=r.tx;p.y=r.ty;p.rescue=null;p.onGround=true;p.coyote=CONFIG.coyote;p.vy=0;p.vx=0;p.airDirection=0;p.anim='land';p.land=.22;emit('safe',p.x,p.y);}return;}
 const wasGround=p.onGround;
 if(p.ground&&wasGround){p.x+=p.ground.dx||0;p.y+=p.ground.dy||0;}
 if(input.dir){p.face=input.dir;if(!p.onGround)p.airDirection=input.dir;}
 p.buffer=input.jump?CONFIG.buffer:Math.max(0,p.buffer-dt);p.coyote=p.onGround?CONFIG.coyote:Math.max(0,p.coyote-dt);
 if(p.buffer>0&&p.coyote>0){p.vy=-CONFIG.jump;p.springFlight=false;p.onGround=false;p.ground=null;p.coyote=0;p.buffer=0;p.airDirection=input.dir||p.face;emit('jump',p.x,p.y);}
 const target=(p.onGround?input.dir:(input.dir||p.airDirection))*(p.onGround?CONFIG.speed:p.springFlight?p.springAirSpeed:CONFIG.airSpeed);
 p.vx+=(target-p.vx)*Math.min(1,dt*(p.onGround?22:10));
 const ox=p.x;p.x=Math.max(4,Math.min(l.width-p.w-4,p.x+p.vx*dt));
 for(const b of [...l.terrain,...(l.obstacles||[])])if(overlaps(p,b)){if(ox+p.w<=b.x+1)p.x=b.x-p.w;else if(ox>=b.x+b.w-1)p.x=b.x+b.w;p.vx=0;}
 const oldBottom=p.y+p.h;p.vy+=CONFIG.gravity*dt;p.y+=p.vy*dt;p.onGround=false;p.ground=null;
 if(p.vy>=0){let best=null;for(const b of [...l.terrain,...l.platforms,...l.moving,...(l.obstacles||[]),...l.springs.map(s=>({x:s.x+18,y:s.y,w:s.w-36,h:12,solid:false}))]){const margin=(!b.solid&&!wasGround&&p.vy>80)?(b.kind==='raft'||b.kind==='water-center'?20:CONFIG.landingAssist):0;
  if(p.x+p.w>b.x-margin&&p.x<b.x+b.w+margin&&oldBottom<=b.y+Math.max(2,b.dy||0)&&p.y+p.h>=b.y&&(!best||b.y<best.y))best=b;}
  if(best){p.y=best.y-p.h;p.vy=0;p.springFlight=false;p.onGround=true;p.ground=best;p.airDirection=0;if(p.x+p.w<=best.x)p.x=best.x-p.w+5;if(p.x>=best.x+best.w)p.x=best.x+best.w-5;if(!wasGround){p.land=.16;emit('land',p.x,p.y);}}
 }
 if(wasGround&&!p.onGround&&p.vy>=0)p.airDirection=input.dir||p.face;
 for(const s of l.springs)if(s.cooldown<=0&&p.onGround&&p.x+p.w/2>=s.x+18&&p.x+p.w/2<=s.x+s.w-18&&(Math.abs(p.y+p.h-(s.groundY??s.y))<10||Math.abs(p.y+p.h-s.y)<10)){
  p.y=s.y-p.h;p.vy=-CONFIG.springJump;p.springFlight=true;p.springAirSpeed=s.airSpeed||190;p.onGround=false;p.ground=null;p.airDirection=input.dir||0;if(!input.dir)p.vx=0;p.buffer=0;p.coyote=0;s.cooldown=.9;s.squash=.4;emit('spring',s.x+s.w/2,s.y);}

 if((l.water&&p.x+p.w/2>l.water.x&&p.x+p.w/2<l.water.end&&p.y+p.h>l.water.surface+65)||p.y>820||!Number.isFinite(p.x)||!Number.isFinite(p.y)){beginRescue(p,l);emit('rescue',p.x,p.y);}
 p.anim=p.collect>0?'collect':p.land>0?'land':!p.onGround?(p.vy<0?'jump':'fall'):Math.abs(p.vx)>12?'walk':'idle';
}
export function stepCollectibles(p,l,emit=()=>{}){
 if(p.rescue)return;
 for(const s of l.stars)if(!s.taken&&Math.hypot(p.x+p.w/2-s.x,p.y+p.h/2-s.y)<51){s.taken=true;p.collect=.24;emit('starlet',s.x,s.y,s.id);}
 for(const s of l.superStars)if(!s.taken&&Math.hypot(p.x+p.w/2-s.x,p.y+p.h/2-s.y)<56){s.taken=true;p.collect=.65;emit('superstar',s.x,s.y,s.id);}
 for(let i=l.checkpoint+1;i<l.checkpoints.length;i++){const cp=l.checkpoints[i];if(Math.abs(p.x-cp.x)<65&&Math.abs(p.y+p.h-cp.y)<110){l.checkpoint=i;emit('checkpoint',cp.x,cp.y);}}
 for(const s of l.surprises)if(!s.triggered&&Math.abs(p.x-s.x)<90){s.triggered=true;emit('surprise',s.x,535,s.kind);}
}
export class Camera {
 constructor(){this.x=0;this.y=0;}
 snap(p,l){this.x=Math.max(0,Math.min(l.width-1280,p.x-430));this.y=Math.max(-460,Math.min(0,p.y-250));}
 step(p,l,dt){const tx=Math.max(0,Math.min(l.width-1280,p.x-430+p.face*45)),ty=Math.max(-460,Math.min(0,p.y-250));this.x+=(tx-this.x)*(1-Math.exp(-3.1*dt));this.y+=(ty-this.y)*(1-Math.exp(-4.5*dt));this.x=Math.max(0,Math.min(l.width-1280,this.x));this.y=Math.max(-460,Math.min(0,this.y));}
}
