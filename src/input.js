'use strict';
export class Input {
 constructor(){this.held=new Set();this.jump=false;this.pause=false;this.menu=false;
 window.addEventListener('keydown',e=>{const interactive=e.target instanceof Element&&e.target.matches('input,button,textarea,select');if(interactive&&e.code!=='Escape')return;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space','Escape'].includes(e.code))e.preventDefault();if(!e.repeat){if(e.code==='Space')this.jump=true;if(e.code==='Escape')this.pause=true;if(e.code==='Enter')this.menu=true;}this.held.add(e.code);});
 window.addEventListener('keyup',e=>this.held.delete(e.code));window.addEventListener('blur',()=>this.clear());}
 direction(){return (this.held.has('ArrowRight')?1:0)-(this.held.has('ArrowLeft')?1:0);}
 clear(){this.held.clear();this.jump=false;this.pause=false;this.menu=false;}
 consume(){const r={dir:this.direction(),jump:this.jump};this.jump=false;return r;}
}
