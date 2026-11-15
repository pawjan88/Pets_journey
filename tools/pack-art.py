"""Pack generated production art into shared-scale, bottom-anchored atlases.
Only layout/encoding changes: no recoloring, painting, or independent frame scale.
"""
from PIL import Image
from pathlib import Path
import json, shutil
root=Path(__file__).resolve().parents[1]
sources={
'meadow':'meadow.png',
'forest':'forest.png',
'beach':'beach.png',
'snow':'snow.png'}
source_root=root/'assets/source'
for key,filename in sources.items():
 target=root/'assets/environment'/f'{key}.webp'
 Image.open(source_root/filename).convert('RGB').save(target,'WEBP',quality=94,method=6)

def pack(source,cols,rows,names,out,slot=(384,448)):
 image=Image.open(source).convert('RGBA');cw=image.width/cols;ch=image.height/rows
 frames=[]
 for i in range(cols*rows):
  x=round(i%cols*cw);y=round(i//cols*ch)
  cut=image.crop((x,y,round((i%cols+1)*cw),round((i//cols+1)*ch)))
  alpha=cut.getchannel('A').point(lambda v:255 if v>24 else 0)
  box=alpha.getbbox(); frames.append(cut.crop(box))
 scale=min((slot[0]-24)/max(x.width for x in frames),(slot[1]-40)/max(x.height for x in frames))
 atlas=Image.new('RGBA',(slot[0]*cols,slot[1]*rows))
 metadata={"columns":cols,"rows":rows,"frameWidth":slot[0],"frameHeight":slot[1],"anchor":[slot[0]//2,slot[1]-14],"scale":scale,"frames":[]}
 for i,frame in enumerate(frames):
  frame=frame.resize((round(frame.width*scale),round(frame.height*scale)),Image.Resampling.LANCZOS)
  ox=i%cols*slot[0];oy=i//cols*slot[1]
  atlas.alpha_composite(frame,(ox+slot[0]//2-frame.width//2,oy+slot[1]-14-frame.height))
  metadata['frames'].append({'name':names[i], 'x':ox,'y':oy,'width':slot[0],'height':slot[1]})
 atlas.save(out)
 Path(str(out)+'.json').write_text(json.dumps(metadata,indent=2),encoding='utf8')
 return metadata
pack(root/'assets/characters/fox-walk.png',8,1,[f'walk-{i+1:02}' for i in range(8)],root/'assets/characters/fox-atlas.png')
pack(source_root/'props-source.png',4,2,['tree','palm','mushroom','snowman','flowers','shell','hedgehog','penguin'],root/'assets/environment/props-atlas.png')
print('Packed four backgrounds and two shared-anchor atlases.')

# Rectangular source textures for four world materials.
source=Image.open(source_root/'terrain-source.png').convert('RGBA')
terrain=Image.new('RGBA',(2048,512));cw=source.width/4
for i in range(4):
 frame=source.crop((round(i*cw),0,round((i+1)*cw),source.height))
 box=frame.getchannel('A').point(lambda v:255 if v>32 else 0).getbbox()
 frame=frame.crop(box).resize((512,512),Image.Resampling.LANCZOS)
 terrain.alpha_composite(frame,(i*512,0))
terrain.save(root/'assets/environment/terrain-atlas.png')
