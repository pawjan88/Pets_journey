// Optional browser QA for a local environment. Not run in managed Sites without its CUA path.
if(process.env.SITES_MANAGED_LINUX_CONTAINER==='1'){console.error('W zarządzanym Sites użyj udostępnionego CUA. Ten skrypt jest przeznaczony do środowiska lokalnego.');process.exit(2);}
const{chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{const {routeAction,ferryAction,canLandOn}=await import('./routes.mjs');const {platformPose}=await import('../src/levels.js');
const browser=await chromium.launch({...(fs.existsSync('/usr/bin/chromium')?{executablePath:'/usr/bin/chromium'}:{}),headless:true});const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[],out=path.resolve(__dirname,'../test-results');fs.mkdirSync(out,{recursive:true});page.on('pageerror',e=>errors.push(e.stack));try{
 await page.goto(process.env.GAME_URL||'http://localhost:5173/?test=1');await page.waitForSelector('.menu-copy');
 for(const id of ['fox','rabbit','hamster']){await page.locator('[data-action=characters]').click();assert.equal(await page.locator('.character-card').count(),3);await page.locator(`[data-character=${id}]`).click();assert.equal(await page.evaluate(()=>window.__adventure.store.data.character),id);}
 await page.locator('[data-action=play]').click();assert.ok((await page.locator('#star-count').innerText()).includes('40'));
 await page.keyboard.down('ArrowRight');await page.waitForTimeout(400);await page.keyboard.up('ArrowRight');await page.waitForTimeout(200);const x=await page.evaluate(()=>window.__adventure.model.player.x);await page.keyboard.press('Space');await page.waitForFunction(x=>{const p=window.__adventure.model.player;return p.y<490&&p.x>x+8;},x);await page.keyboard.press('Escape');await page.waitForSelector('.pause-modal');await page.locator('[data-action=restart]').click();
 const agentSource=`const CONFIG=window.__adventure.CONFIG;const platformPose=${platformPose.toString()};const canLandOn=${canLandOn.toString()};const ferryAction=${ferryAction.toString()};return ${routeAction.toString()};`;
 await page.evaluate(code=>{window.__routeAgent=new Function(code)();},agentSource);
 const routes=[];
 for(let world=0;world<4;world++){
  await page.evaluate(()=>{window.__adventure.game.loop.sleep();window.__routeState=new Map();});let result;
  for(let segment=0;segment<65;segment++){
   result=await page.evaluate(()=>{const a=window.__adventure,m=a.model;for(let n=0;n<1200&&m.state==='playing';n++){m.simulate(window.__routeAgent(m.player,m.level,window.__routeState),a.CONFIG.step);m.renderer.update(a.CONFIG.step);if(m.player.rescue)throw Error('Unexpected rescue');}return {state:m.state,stars:m.starCount(),supers:m.superCount(),seconds:m.elapsed};});
   if(result.state==='complete')break;
  }
  assert.equal(result.state,'complete');assert.equal(result.stars,40);assert.equal(result.supers,3);routes.push({world:world+1,...result});await page.evaluate(()=>window.__adventure.game.loop.wake());await page.waitForTimeout(120);await page.screenshot({path:out+`/browser-v3-world-${world+1}.png`});await page.locator('[data-action=next]').click();
 }
 await page.waitForSelector('.final-modal');await page.screenshot({path:out+'/browser-v3-final.png'});await page.reload();await page.waitForSelector('.menu-copy');const save=await page.evaluate(()=>window.__adventure.store.data);assert.equal(save.version,2);assert.equal(save.character,'hamster');assert.ok(save.finished.every(Boolean)&&save.best.every(n=>n===40)&&save.superStars.every(s=>s.every(Boolean)));assert.equal(errors.length,0);fs.writeFileSync(out+'/browser-v3.json',JSON.stringify({routes,errors,saveRestored:true},null,2));console.log('Browser checks passed.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
