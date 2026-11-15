"""Original synthesized exports matching src/audio.js. No samples or external music."""
from pathlib import Path
import numpy as np, wave
root=Path(__file__).resolve().parents[1]/'assets/audio';root.mkdir(exist_ok=True)
rate=22050

def save(name,data):
 data=np.tanh(data).astype(np.float32);pcm=(data*26000).astype('<i2')
 with wave.open(str(root/name),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes(pcm.tobytes())
def tone(data,f,start,duration,volume=.12,triangle=False):
 offset=int(start*rate);n=min(int(duration*rate),len(data)-offset)
 if n<=0:return
 t=np.arange(n)/rate;envelope=(1-np.exp(-t*100))*np.exp(-t*5/duration)
 sig=2/np.pi*np.arcsin(np.sin(2*np.pi*f*t))if triangle else np.sin(2*np.pi*f*t)
 data[offset:offset+n]+=sig*envelope*volume
motifs=[[0,4,7,9,7,4,2,4],[0,3,7,10,7,5,3,7],[0,4,7,12,9,7,4,2],[0,7,11,14,11,7,4,7]]
for index,notes in enumerate(motifs):
 data=np.zeros(int(rate*26.88));base=[60,57,62,60][index]
 for n in range(64):
  if n%2==0:tone(data,440*2**((base+notes[(n//2)%8]-69)/12),n*.42,1.1,.1)
  if n%8==0:
   for shift in[0,7,12]:tone(data,440*2**((base-24+shift-69)/12),n*.42,3.2,.035,True)
 data[-int(rate*.03):]*=np.linspace(1,0,int(rate*.03))
 save(f'{index+1:02}-'+['laka','las','plaza','snieg'][index]+'.wav',data)
patterns={'jump':[330,440],'coin':[880,1174],'star':[523,659,784,1046],'spring':[220,330,660],'checkpoint':[440,554,659],'finish':[523,659,784,1046,784,1046],'click':[600],'rescue':[392,523],'safe':[659],'surprise':[784,988]}
for key,notes in patterns.items():
 dur=.6 if key=='finish' else .26;data=np.zeros(int(rate*(len(notes)*.09+dur)))
 for i,f in enumerate(notes):tone(data,f,i*.09,dur,.14)
 save(key+'.wav',data)
print('Wrote four original music themes and ten effects.')
