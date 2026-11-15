import {CONFIG} from './config.js';
// A mostly level safety floor below long chains of independent airborne platforms.
const CHAINS=[
 [[800,528,210],[1050,468,210],[1300,408,240],[1590,348,270],[1900,408,230],[2170,468,220],[2440,528,230]],
 [[3150,528,210],[3400,468,220],[3660,408,230],[3940,468,230],[4220,528,240]],
 [[5300,528,220],[5570,448,240],[5860,528,220]],
 [[8300,528,220],[8570,468,220],[8840,408,230],[9120,348,240],[9410,408,240],[9700,468,240],[9990,528,250]],
 [[11800,528,220],[12070,468,220],[12340,408,220],[12610,348,230],[12890,288,240],[13180,288,270],[13500,348,240],[13790,408,240],[14080,468,250],[14380,528,270]],
 [[20400,528,220],[20670,468,220],[20940,408,240],[21230,348,260],[21540,408,240],[21830,468,250],[22130,528,270]]
];
export function terrainHeight(data,x){const h=data.hills.find(([a,b])=>x>=a&&x<b);return h?h[2]:588;}
export function platformPose(p,time){const a=time*Math.PI*2/p.period+(p.phase||0),v=Math.sin(a)*p.range;return {x:p.bx!==undefined?p.bx+(p.axis==='x'?v:0):p.x+(p.axis==='x'?v:0),y:(p.by??p.y)+(p.axis==='y'?v:0)+(p.bob?Math.sin(time*1.6)*p.bob:0)};}
function designWorld(index){
 const shift=[0,-12,12,-6][index];
 const platforms=CHAINS.flat().map(([x,y,w])=>({x,y:y+shift,w,kind:'chain'}));
 // Wide landing decks safely beyond the two tall tree/palm crossings.
 platforms.push(...[[6890,300,480],[7420,380,350],[7820,500,300],[16190,300,480],[16720,380,420],[17190,460,350],[17590,528,300]].map(([x,y,w])=>({x,y:y+shift,w,kind:'sky-landing'})));
 const water={id:'long-water',x:18700,end:20060,surface:612};
 platforms.push({id:'water-center',x:19240,y:540,w:280,kind:'water-center'});
 const moving=[{id:'ferry-left',x:18840,y:540,w:240,axis:'x',range:120,period:14,phase:-Math.PI/2,bob:2,kind:'raft'},
  {id:'ferry-right',x:19660,y:540,w:240,axis:'x',range:120,period:14,phase:Math.PI/2,bob:2,kind:'raft'}];
 const springs=[6500,15800].map(x=>({x,y:548,groundY:588,w:164,airSpeed:190}));
 const obstacles=springs.map((s,i)=>({id:'tall-tree-'+i,x:s.x+200,y:258,w:90,h:330,solid:true,baseY:588,rootX:s.x+245,artHeight:390,artScaleX:.72,kind:index===2?'palm':'tree',springX:s.x}));
 const d={width:24200,minY:-480,hills:[[3150,3490,548+shift],[11800,12150,548+shift]],
  gaps:[[4800,4900],[11000,11100],[11300,11400],[water.x,water.end]],water,platforms,moving,springs,obstacles,
  superStars:[{id:0,x:1720,y:303+shift},{id:1,x:13480,y:243+shift},{id:2,x:19380,y:495}],
  checkpoints:[{x:180,y:588,hidden:true},{x:4500,y:588,hazardX:4800},{x:10800,y:588,hazardX:11000},{x:18450,y:588,hazardX:18700}],
  surprises:[{x:2750,kind:index===1?'firefly':'butterfly'},{x:6280,kind:'tall_jump'},{x:11500,kind:index===2?'crab':'flowers'},{x:15580,kind:'tall_jump'},{x:18380,kind:'ferry'},{x:23100,kind:index===3?'snow':'flowers'}]};
 const points=[450,900,1150,1400,2000,2530,3260,3770,4310,5220,5410,5690,5980,7090,7650,8410,8940,9490,11200,11910,12720,13380,14220,16420,20540,21640,23480];
 const trail=points.map(x=>{const p=d.platforms.find(p=>x>=p.x&&x<p.x+p.w);return {x,y:(p?.y??terrainHeight(d,x))-42,kind:'trail'};});
 const sky=springs.flatMap(s=>[170,210,250,290,330].map(dx=>({x:s.x+dx,y:-63,kind:'sky'})));
 const ferry=[{x:18960,y:498,platformId:'ferry-left',offsetX:120,offsetY:-42,kind:'ferry'},{x:19380,y:498,kind:'trail'},{x:19780,y:498,platformId:'ferry-right',offsetX:120,offsetY:-42,kind:'ferry'}];
 d.stars=[...trail,...sky,...ferry].sort((a,b)=>a.x-b.x).map((s,id)=>({...s,id}));
 d.climbs=d.hills.map(([x,,y])=>({x,y}));return d;
}
export const LEVEL_DATA=[0,1,2,3].map(designWorld);
export function createLevel(index){
 const d=JSON.parse(JSON.stringify(LEVEL_DATA[index]));
 const cuts=[0,d.width,...d.hills.flatMap(([a,b])=>[a,b]),...d.gaps.flat()].sort((a,b)=>a-b),terrain=[];
 for(let i=0;i<cuts.length-1;i++){const x=cuts[i],end=cuts[i+1];if(end<=x||d.gaps.some(([a,b])=>(x+end)/2>=a&&(x+end)/2<b))continue;terrain.push({x,y:terrainHeight(d,(x+end)/2),w:end-x,h:1000,solid:true,id:'t'+i});}
 const level={...d,index,time:0,goal:d.width-340,terrain,
  platforms:d.platforms.map((p,i)=>({...p,h:40,id:p.id||'p'+i,solid:false})),
  moving:d.moving.map(p=>({...p,bx:p.x,by:p.y,dx:0,dy:0,h:32,solid:false})),
  stars:d.stars.map(s=>({...s,taken:false})),superStars:d.superStars.map(s=>({...s,taken:false})),checkpoint:0,
  surprises:d.surprises.map(s=>({...s,triggered:false})),springs:d.springs.map(s=>({...s,squash:0,cooldown:0}))};
 for(const p of level.moving){const pose=platformPose(p,0);p.x=pose.x;p.y=pose.y;}
 for(const s of level.stars)if(s.platformId){const p=level.moving.find(p=>p.id===s.platformId);s.x=p.x+s.offsetX;s.y=p.y+s.offsetY;}
 return level;
}
