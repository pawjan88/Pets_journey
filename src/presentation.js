import {PROP_ROOTS} from './art-metadata.js';
export function stableGround(level,x,halfWidth=0){
 if(!level)return null;const heights=[-halfWidth,0,halfWidth].map(dx=>level.terrain.find(b=>x+dx>=b.x&&x+dx<b.x+b.w)?.y);
 return heights.every(y=>Number.isFinite(y)&&Math.abs(y-heights[1])<.5)?heights[1]:null;
}
export function groundedProp(level,name,x,height,scaleX=1){
 const root=PROP_ROOTS[name],half=root?root.supportHalf*height/448*scaleX+3:20;
 const y=stableGround(level,x,half);return y===null?null:{x,y,halfWidth:half};
}
