from pathlib import Path
import shutil, zipfile, hashlib,json,struct
root=Path(__file__).resolve().parents[1];out=Path('/workspace/output');out.mkdir(exist_ok=True)
for src,name in [('dist/index.html','Zwierzaczkowa-Przygoda.html'),('README.md','README.md'),('RAPORT_TESTOW.md','RAPORT_TESTOW.md'),('URUCHOMIENIE.txt','URUCHOMIENIE.txt'),('LICENCJE.md','LICENCJE.md'),('test-results/final-menu-fullhd.png','Podglad-FullHD.png')]:shutil.copy2(root/src,out/name)
# Everything necessary to edit and rebuild, including original art and exported audio.
with zipfile.ZipFile(out/'Zwierzaczkowa-Przygoda-Zrodla.zip','w',zipfile.ZIP_DEFLATED,compresslevel=6)as z:
 for path in sorted(root.rglob('*')):
  if not path.is_file():continue
  rel=path.relative_to(root)
  if any(x in rel.parts for x in ['node_modules','.git','.vite']):continue
  if rel.parts[0]=='test-results' and path.name not in ['physics-report.txt','browser-report.json','release-report.json'] and not path.name.startswith('final-'):continue
  z.write(path,'Zwierzaczkowa-Przygoda/'+str(rel))
win=Path('/workspace/work/windows-package/Zwierzaczkowa-Przygoda-Windows')
exe=(win/'Zwierzaczkowa Przygoda.exe').read_bytes();pe=struct.unpack_from('<I',exe,0x3c)[0]
assert exe[:2]==b'MZ' and exe[pe:pe+4]==b'PE\0\0' and struct.unpack_from('<H',exe,pe+4)[0]==0x8664
assert (win/'resources/app/index.html').read_bytes()==(root/'dist/index.html').read_bytes()
with zipfile.ZipFile(out/'Zwierzaczkowa-Przygoda-Windows.zip','w',zipfile.ZIP_DEFLATED,compresslevel=6)as z:
 for path in sorted(win.rglob('*')):
  if path.is_file():z.write(path,'Zwierzaczkowa-Przygoda-Windows/'+str(path.relative_to(win)))
checksums=[]
for path in sorted(out.iterdir()):
 if path.is_file()and path.name!='SUMY-SHA256.txt':checksums.append(hashlib.sha256(path.read_bytes()).hexdigest()+'  '+path.name)
(out/'SUMY-SHA256.txt').write_text('\n'.join(checksums)+'\n',encoding='utf8')
for f in sorted(out.iterdir()):print(f.name,round(f.stat().st_size/1024/1024,2),'MiB')
for name in ['Zwierzaczkowa-Przygoda-Zrodla.zip','Zwierzaczkowa-Przygoda-Windows.zip']:
 with zipfile.ZipFile(out/name)as z:
  assert z.testzip()is None
  print('ZIP verified:',name,'files:',len(z.namelist()))
