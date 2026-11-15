import meadowUrl from '../assets/environment/meadow.webp';
import forestUrl from '../assets/environment/forest.webp';
import beachUrl from '../assets/environment/beach.webp';
import snowUrl from '../assets/environment/snow.webp';
import foxUrl from '../assets/characters/fox-atlas.png';
import rabbitUrl from '../assets/characters/rabbit-atlas.png';
import hamsterUrl from '../assets/characters/hamster-atlas.png';
import terrainUrl from '../assets/environment/terrain-atlas.png';
import polishPropsUrl from '../assets/environment/polish-v3-props.png';
import polishPlatformsUrl from '../assets/environment/polish-v3-platforms.png';
import propsUrl from '../assets/environment/props-atlas.png';
export const ASSET_MANIFEST=Object.freeze({backgrounds:[meadowUrl,forestUrl,beachUrl,snowUrl],characters:{fox:foxUrl,rabbit:rabbitUrl,hamster:hamsterUrl},environment:{props:propsUrl,terrain:terrainUrl,polishProps:polishPropsUrl,polishPlatforms:polishPlatformsUrl}});
export async function loadArtwork(){
 const load=url=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(Error('Nie udało się załadować grafiki.'));image.src=url;});
 const backgrounds=await Promise.all(ASSET_MANIFEST.backgrounds.map(load));
 const [fox,rabbit,hamster,props,terrain,polishProps,polishPlatforms]=await Promise.all([load(foxUrl),load(rabbitUrl),load(hamsterUrl),load(propsUrl),load(terrainUrl),load(polishPropsUrl),load(polishPlatformsUrl)]);
 return {backgrounds,characters:{fox,rabbit,hamster},fox,props,terrain,polishProps,polishPlatforms};
}
