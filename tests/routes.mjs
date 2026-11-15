import {CONFIG} from '../src/config.js';
import {createLevel,platformPose} from '../src/levels.js';
import {makePlayer,updatePlatforms,stepPlayer,stepCollectibles,Camera} from '../src/physics.js';
export function canLandOn(p,l,target){
 const foot=p.y+p.h,dy=target.y-foot,disc=CONFIG.jump**2+2*CONFIG.gravity*dy;if(disc<0)return false;
 const t=(CONFIG.jump+Math.sqrt(disc))/CONFIG.gravity;
 const pose=target.period?platformPose(target,l.time+t):target;
 const distance=CONFIG.airSpeed*t-(CONFIG.airSpeed-p.vx)*(1-Math.exp(-10*t))/10;
 const x=p.x+distance;return x+p.w>pose.x+18&&x<pose.x+target.w-24;
}
export function ferryAction(p,l,state){
 if(!p.onGround)return {dir:0,jump:false};
 let stage=state.get('ferry-stage')||0;
 if(p.ground?.id==='ferry-left')stage=1;else if(p.ground?.id==='water-center')stage=2;else if(p.ground?.id==='ferry-right')stage=3;else if(p.x>=l.water.end-15)stage=4;
 state.set('ferry-stage',stage);if(stage===4)return {dir:1,jump:false};
 const left=l.moving.find(b=>b.id==='ferry-left'),right=l.moving.find(b=>b.id==='ferry-right'),center=l.platforms.find(b=>b.id==='water-center');
 const source=stage===0?{x:0,w:l.water.x}:stage===1?left:stage===2?center:right;
 const target=stage===0?left:stage===1?center:stage===2?right:{x:l.water.end,y:588,w:2000};
 const edge=source.x+source.w-52;
 if(p.x<edge-2)return {dir:1,jump:false};
 if(canLandOn(p,l,target))return {dir:0,jump:true};
 return {dir:0,jump:false};
}
export function routeAction(p,l,attempts=new Map()){
 if(l.water&&p.x>l.water.x-350&&p.x<l.water.end+100)return ferryAction(p,l,attempts);
 let dir=p.onGround?1:0,jump=false;
 if(p.onGround){const foot=p.y+p.h;
  const f=[...l.climbs.map((s,i)=>({...s,id:'climb'+i})),...l.platforms.filter(p=>p.kind!=='water-center')].find(b=>p.x>=b.x-57&&p.x<b.x-16&&foot-b.y>-101&&foot-b.y<123&&(foot-b.y>10||p.ground?.kind==='chain'||p.ground?.kind==='sky-landing'));
  const gap=l.gaps.find(([x])=>p.x>=x-45&&p.x<x-20),id=f?.id||(gap?'gap'+gap[0]:null);
  if(id){const count=(attempts.get(id)||0)+1;attempts.set(id,count);if(count>3)throw Error('Repeated jump '+id+' at '+p.x);jump=true;dir=0;}}
 return {dir,jump};
}
export function traverse(index,character='fox',initialTime=0){
 const l=createLevel(index),p=makePlayer(180,588,character),cam=new Camera(),events=[],attempts=new Map(),supports=new Set();l.time=initialTime;let n=0,jumps=0,minY=524,minCamera=0;
 while(p.x<l.goal-45&&n<65000){const action=routeAction(p,l,attempts);if(action.jump)jumps++;
  updatePlatforms(l,CONFIG.step);stepPlayer(p,l,action,CONFIG.step,(...e)=>events.push(e));stepCollectibles(p,l,(...e)=>events.push(e));cam.step(p,l,CONFIG.step);
  if(p.onGround&&p.ground?.id)supports.add(p.ground.id);
  minY=Math.min(minY,p.y);minCamera=Math.min(minCamera,cam.y);
  if(p.rescue)throw Error('Rescue world '+index+' at '+p.x+' t='+l.time+' ground='+p.ground?.id+' stage='+attempts.get('ferry-stage'));
  n++;
 }
 if(n>=65000)throw Error('Stuck at '+p.x+' y='+p.y+' ground='+p.ground?.id+' stage='+attempts.get('ferry-stage'));
 return {world:index+1,character,seconds:n*CONFIG.step,x:p.x,jumps,minY,minCamera,stars:l.stars.filter(s=>s.taken).length,supers:l.superStars.filter(s=>s.taken).length,checkpoint:l.checkpoint,missing:l.stars.filter(s=>!s.taken).map(s=>({id:s.id,x:s.x,y:s.y})),missingSuper:l.superStars.filter(s=>!s.taken),ferrySupports:[...supports].filter(id=>id==='ferry-left'||id==='water-center'||id==='ferry-right'),springEvents:events.filter(e=>e[0]==='spring').length};
}
