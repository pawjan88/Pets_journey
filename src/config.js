'use strict';
export const CONFIG = Object.freeze({width:1280,height:720,renderWidth:1920,renderHeight:1080,step:1/120,speed:129.6,airSpeed:129.6,gravity:900,jump:470,springJump:1050,coyote:0.15,buffer:0.15,landingAssist:12,rescueTime:1.6,playerW:38,playerH:64,saveKey:'zwierzaczkowa-przygoda-v1'});
export const THEMES = [
 {name:'Kwiatowa Łąka',short:'Łąka',subtitle:'Tam, gdzie tańczą motyle',sky:'#cfebee',horizon:'#f8f2d7',far:'#c4dbad',hill:'#a2c997',grass:'#74ce32',edge:'#33872d',soil:'#bd895a',accent:'#e9a068',dark:'#315c53',water:'#87cbd0',notes:[0,4,7,9,7,4,2,4]},
 {name:'Zaczarowany Las',short:'Las',subtitle:'Małe sekrety między drzewami',sky:'#c9dcdf',horizon:'#e8efd8',far:'#a9c4b3',hill:'#86af9a',grass:'#61bf35',edge:'#2d783d',soil:'#a77c52',accent:'#ba91c4',dark:'#365951',water:'#9dc9c7',notes:[0,3,7,10,7,5,3,7]},
 {name:'Słoneczna Plaża',short:'Plaża',subtitle:'Muszelki, fale i ciepły piasek',sky:'#ccebf0',horizon:'#fff0d0',far:'#a5d3d1',hill:'#70b8c1',grass:'#f5d276',edge:'#d29942',soil:'#d9a05a',accent:'#e7a087',dark:'#49696c',water:'#7bc6cd',notes:[0,4,7,12,9,7,4,2]},
 {name:'Kraina Śniegu',short:'Śnieg',subtitle:'Ciche płatki i wielka radość',sky:'#d8e1f0',horizon:'#f2eafa',far:'#bdc9e2',hill:'#a5bbd5',grass:'#f8fcff',edge:'#75a8d3',soil:'#a9cce8',accent:'#aa9fcd',dark:'#536583',water:'#a7cadf',notes:[0,7,11,14,11,7,4,7]}
];

export const CHARACTERS=Object.freeze([{id:"fox",name:"Lisek",tagline:"Rudy odkrywca"},{id:"rabbit",name:"Królik",tagline:"Uszy pełne przygód"},{id:"hamster",name:"Chomik",tagline:"Mały, ale ciekawski"}]);
