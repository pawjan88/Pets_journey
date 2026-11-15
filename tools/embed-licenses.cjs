const fs=require('fs');
const p='dist/index.html';let html=fs.readFileSync(p,'utf8');
const licenses={Phaser:{license:'MIT',text:fs.readFileSync('licenses/Phaser-MIT.txt','utf8')},Nunito:{license:'SIL OFL 1.1',text:fs.readFileSync('assets/fonts/OFL.txt','utf8')}};
const json=JSON.stringify(licenses).replace(/</g,'\\u003c');
const at=html.lastIndexOf('</body>');if(at<0)throw Error('Missing final body element');
html=html.slice(0,at)+`<script type="application/json" id="third-party-licenses">${json}</script>`+html.slice(at);
fs.writeFileSync(p,html);console.log('Embedded Phaser and font license texts.');
