import Phaser from 'phaser';
import './style.css';
import {SaveStore} from './save.js';
import {Input} from './input.js';
import {AudioSystem} from './audio.js';
import {WorldRenderer} from './renderer.js';
import {Adventure} from './game.js';
import {Interface} from './ui.js';
import {CONFIG} from './config.js';
import {LEVEL_DATA} from './levels.js';
import {loadArtwork} from './assets.js';
async function boot(){
let storage;try{storage=window.localStorage;}catch{storage={getItem(){throw Error('Storage unavailable');},setItem(){throw Error('Storage unavailable');}};}
const store=new SaveStore(storage),input=new Input(),audio=new AudioSystem(store),renderer=new WorldRenderer();
renderer.artwork=await loadArtwork();
const model=new Adventure(store,input,audio,renderer);
let ui;class AdventureScene extends Phaser.Scene {
 constructor(){super('AdventureScene');}
 create(){this.surface=this.textures.createCanvas('storybook',1920,1080);this.add.image(0,0,'storybook').setOrigin(0);ui=new Interface(model,document.querySelector('#ui'));document.querySelector('#loading').remove();}
 update(_time,delta){model.frame(delta/1000);this.surface.context.save();this.surface.context.scale(1.5,1.5);renderer.draw(this.surface.context,model);this.surface.context.restore();this.surface.refresh();ui.update();}
}
const game=new Phaser.Game({type:Phaser.CANVAS,parent:'phaser-root',width:1920,height:1080,backgroundColor:'#f8f1df',banner:false,scene:AdventureScene,audio:{noAudio:true},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},fps:{target:60,smoothStep:true}});
// Deterministic QA interface: only available for explicit ?test mode. Not shipped as a gameplay control.
if(new URLSearchParams(location.search).has('test'))window.__adventure={model,store,input,audio,renderer,game,CONFIG,LEVEL_DATA,snapshot:()=>JSON.parse(JSON.stringify({state:model.state,player:model.player,level:model.level,save:store.data,effects:model.effects}))};
window.addEventListener('beforeunload',()=>store.write());

}
boot().catch(error=>{console.error(error);const message=document.querySelector("#loading");if(message)message.textContent="Nie udało się uruchomić gry. Spróbuj otworzyć ją ponownie.";});
