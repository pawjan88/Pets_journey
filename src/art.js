// Original vector illustrations, shared anchors, no third-party game art.
export function ellipse(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();}
export function path(c,color,points){c.fillStyle=color;c.beginPath();for(const p of points){if(p.length===2)c.lineTo(...p);else if(p.length===4)c.quadraticCurveTo(...p);else c.bezierCurveTo(...p);}c.closePath();c.fill();}
export function round(c,x,y,w,h,r,color){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
export function stroke(c,color,width,draw){c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.beginPath();draw(c);c.stroke();}
export function star(c,x,y,r,color,rotation=0){c.fillStyle=color;c.beginPath();for(let i=0;i<10;i++){const a=rotation-Math.PI/2+i*Math.PI/5,q=i%2?r*.49:r;c.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q);}c.closePath();c.fill();}
export function flower(c,x,y,size,t,color='#e8a1a0'){c.save();c.translate(x,y);c.rotate(Math.sin(t+x)*.07);stroke(c,'#6e9973',2.5,c=>{c.moveTo(0,0);c.quadraticCurveTo(4,-size*.55,0,-size);});ellipse(c,5,-size*.35,6,3,'#88ac7a');for(let i=0;i<5;i++){let a=i*Math.PI*2/5;ellipse(c,Math.cos(a)*size*.22,-size+Math.sin(a)*size*.22,size*.17,size*.17,color);}ellipse(c,0,-size,size*.13,size*.13,'#f7d782');c.restore();}
export function butterfly(c,x,y,s,t,color='#e5a088'){c.save();c.translate(x,y);c.scale(s,s);const f=.35+Math.abs(Math.sin(t*5))*.65;ellipse(c,-7*f,-3,8*f,10,color);ellipse(c,7*f,-3,8*f,10,color);ellipse(c,-5*f,7,5*f,5,'#efd4ad');ellipse(c,5*f,7,5*f,5,'#efd4ad');stroke(c,'#5c7261',2,c=>{c.moveTo(0,-5);c.lineTo(0,10);});c.restore();}
export function cloud(c,x,y,s=1,alpha=.7){c.save();c.globalAlpha=alpha;c.translate(x,y);c.scale(s,s);ellipse(c,0,0,70,22,'#fffdf2');ellipse(c,-28,-12,35,27,'#fffdf2');ellipse(c,16,-23,41,36,'#fffdf2');ellipse(c,58,-5,36,23,'#fffdf2');c.restore();}
export function tree(c,x,y,s,theme,t=0){c.save();c.translate(x,y);c.scale(s,s);const snowy=theme===3;const colors=theme===1?['#759b8a','#8db29c','#a6c4a3']:['#96b889','#aac69a','#c0d3a8'];
 stroke(c,'#b39378',19,c=>{c.moveTo(0,0);c.bezierCurveTo(-7,-70,12,-110,4,-174);});stroke(c,'#b39378',10,c=>{c.moveTo(0,-65);c.lineTo(-38,-125);c.moveTo(4,-90);c.lineTo(43,-149);});
 if(snowy){for(let i=0;i<3;i++){path(c,['#9fbeb8','#accbc4','#bad5cf'][i],[[-75+i*12,-50-i*42],[2,-222],[75-i*12,-50-i*42],[35,-37-i*42],[-34,-39-i*42]]);path(c,'#f4f6f4',[[-66+i*12,-59-i*42],[2,-222],[64-i*12,-59-i*42],[28,-74-i*42],[0,-66-i*42],[-26,-75-i*42]]);}}
 else{ellipse(c,-42,-164,61,70,colors[0]);ellipse(c,44,-179,61,70,colors[1]);ellipse(c,0,-209,68,70,colors[2]);ellipse(c,-28,-222,30,28,'#cbdcb3');for(let i=0;i<5;i++)ellipse(c,-47+i*24,-170+Math.sin(i*3)*28,4,6,'#e4c79a');}c.restore();}
export function palm(c,x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);stroke(c,'#b99a74',19,c=>{c.moveTo(0,0);c.bezierCurveTo(-20,-60,7,-125,24,-174);});for(let i=0;i<5;i++){const a=-Math.PI+i*Math.PI/4;const ex=24+Math.cos(a)*106,ey=-174+Math.sin(a)*55;path(c,i%2?'#80a991':'#93baa0',[[24,-174],[24+Math.cos(a)*65,-224+Math.sin(a)*45,ex,ey],[24+Math.cos(a)*56,-178+Math.sin(a)*40,24,-174]]);}ellipse(c,16,-168,10,12,'#ad8e70');ellipse(c,35,-165,10,12,'#b69b78');c.restore();}
export function mushroom(c,x,y,s,t,color='#c794a5'){c.save();c.translate(x,y);c.scale(s,s);round(c,-9,-31,18,32,8,'#edddbc');ellipse(c,0,-36,34,20,color);path(c,color,[[-34,-34],[-30,-63,0,-65],[28,-63,34,-34]]);ellipse(c,-13,-47,7,5,'#f8ebd0');ellipse(c,12,-52,6,5,'#f8ebd0');ellipse(c,23,-37,4,3,'#f8ebd0');c.restore();}
export function shell(c,x,y,s,color='#edb6a3'){c.save();c.translate(x,y);c.scale(s,s);path(c,color,[[-17,0],[-32,-31,-8,-37],[0,-47,10,-34],[31,-28,17,0],[0,5,-17,0]]);for(let i=-1;i<=1;i++)stroke(c,'#d29384',1.5,c=>{c.moveTo(i*5,0);c.lineTo(i*12,-28);});c.restore();}
export function snowman(c,x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);ellipse(c,0,-28,29,30,'#f4f8fa');ellipse(c,0,-68,22,22,'#fcfcf5');round(c,-24,-61,48,10,5,'#b198b6');round(c,11,-56,8,22,3,'#b198b6');ellipse(c,-7,-73,2.4,3,'#4f6677');ellipse(c,7,-73,2.4,3,'#4f6677');path(c,'#e6ae7e',[[0,-68],[18,-65],[0,-63]]);ellipse(c,0,-31,2.3,2.5,'#8099a8');ellipse(c,0,-19,2.3,2.5,'#8099a8');c.restore();}
export function friend(c,x,y,s,t,kind){c.save();c.translate(x,y);c.scale(s,s);if(kind==='crab'){for(let i of[-1,1]){stroke(c,'#c98d7d',3,c=>{c.moveTo(i*12,-10);c.lineTo(i*27,-17);c.lineTo(i*31,-28+Math.sin(t*2)*3);c.moveTo(i*12,-7);c.lineTo(i*24,0);});ellipse(c,i*31,-29,6,7,'#df9e86');}ellipse(c,0,-11,20,12,'#e3a58a');ellipse(c,-7,-24,3,6,'#e3a58a');ellipse(c,7,-24,3,6,'#e3a58a');ellipse(c,-7,-26,2,2,'#4b675f');ellipse(c,7,-26,2,2,'#4b675f');}
 else if(kind==='penguin'){ellipse(c,-9,0,8,4,'#dcb37b');ellipse(c,9,0,8,4,'#dcb37b');ellipse(c,0,-24,21,28,'#667e94');ellipse(c,0,-19,14,20,'#fbf7ec');ellipse(c,-7,-33,3,3,'#f9f6ec');ellipse(c,7,-33,3,3,'#f9f6ec');ellipse(c,-7,-33,1.8,2,'#3d5768');ellipse(c,7,-33,1.8,2,'#3d5768');path(c,'#e8b37b',[[-4,-27],[5,-27],[0,-21]]);}
 else{ellipse(c,0,-12,25,16,'#b89b7d');for(let i=0;i<7;i++)path(c,'#9c876f',[[-23+i*7,-12],[-20+i*7,-33-Math.sin(i)*2],[-14+i*7,-10]]);ellipse(c,20,-11,14,11,'#e1c6a5');ellipse(c,26,-15,2.2,2.2,'#4d5d50');ellipse(c,34,-10,3,3,'#536456');}c.restore();}
export function fox(c,x,y,s,face,state,t){
 c.save();c.translate(x,y);c.scale(s*face,s);const walking=state==='walk',happy=state==='happy',jump=state==='jump',fall=state==='fall';const stride=walking?Math.sin(t*11):0;let bob=walking?Math.abs(stride)*2:Math.sin(t*2)*1.1;if(happy)bob-=Math.abs(Math.sin(t*5))*9;if(state==='land'){c.scale(1.07,.93);}c.translate(0,bob);
 // Tail, in a single soft silhouette with a cream tip.
 c.save();c.translate(-14,-23);c.rotate(-.13+Math.sin(t*3)*.08);path(c,'#d98a56',[[-2,0],[-48,7,-61,-23],[-73,-42,-56,-54],[-51,-30,-25,-37],[-6,-34,2,-13]]);path(c,'#f8e7c7',[[-61,-23],[-73,-42,-56,-54],[-53,-39,-39,-36],[-50,-34,-48,-24],[-56,-31,-61,-23]]);c.restore();
 // Rounded body and little feet.
 ellipse(c,0,-29,22,27,'#de8d55');ellipse(c,4,-28,14,20,'#f6dfb5');
 c.save();c.translate(-11,-6);c.rotate(stride*.42+(jump?-.35:0));round(c,-8,-6,16,12,7,'#8b6550');c.restore();c.save();c.translate(13,-6);c.rotate(-stride*.42+(jump?.35:0));round(c,-8,-6,17,12,7,'#8b6550');c.restore();
 const arm=happy?-16:jump?-10:fall?-5:0;ellipse(c,-22,-28+arm,7,14,'#d98a56');ellipse(c,23,-29+arm,7,13,'#de955e');
 // Ears are anchored to the same head in every animation.
 path(c,'#da8a55',[[-29,-61],[-40,-103,-25,-102],[-10,-95,-6,-70]]);path(c,'#f6c3a1',[[-28,-73],[-32,-96,-25,-94],[-16,-87,-14,-73]]);
 path(c,'#df925d',[[10,-72],[27,-105,34,-101],[43,-81,31,-61]]);path(c,'#f5c2a0',[[17,-75],[29,-96,31,-92],[35,-79,29,-71]]);
 const fur=c.createLinearGradient(-28,-84,28,-35);fur.addColorStop(0,'#eeab6c');fur.addColorStop(.5,'#e99c60');fur.addColorStop(1,'#dc8955');ellipse(c,1,-64,37,31,fur);
 path(c,'#f8e7c7',[[-35,-65],[-24,-53,-12,-57],[0,-43,17,-58],[30,-52,37,-65],[38,-35,4,-32],[-27,-33,-35,-65]]);
 path(c,'#efb77d',[[-9,-92],[-12,-104,0,-98],[7,-104,9,-93],[19,-97,19,-87]]);
 // Big warm eyes with highlights, and a tiny smile.
 for(const ex of [-13,16]){if(happy){stroke(c,'#4b493e',3,c=>{c.moveTo(ex-4,-66);c.quadraticCurveTo(ex,-72,ex+4,-66);});}else{ellipse(c,ex,-66,5.2,7.2,'#4a4c41');ellipse(c,ex+1.5,-68.7,1.8,2.4,'#fffaf0');}}
 ellipse(c,-25,-54,6,3,'#eab3a0');ellipse(c,28,-54,6,3,'#eab3a0');path(c,'#4f5145',[[-4,-54],[2,-57,8,-54],[4,-47,0,-50]]);stroke(c,'#7d6951',1.5,c=>{c.moveTo(2,-49);c.quadraticCurveTo(7,-42,12,-48);});
 // A small sage scarf is the character's recognizable accessory.
 path(c,'#7fa9a0',[[-19,-36],[0,-29,21,-37],[22,-28,2,-24],[-17,-28,-19,-36]]);path(c,'#72a296',[[12,-28],[26,-22],[20,-4],[10,-15]]);stroke(c,'#b9d1b7',2,c=>{c.moveTo(17,-17);c.lineTo(22,-14);});c.restore();
}
export const CHARACTERS=Object.freeze({fox:{draw:fox,displayScale:1,anchor:'bottom-center'}});
