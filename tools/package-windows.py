"""Package the existing web build with an official, SHA-256 verified Electron runtime.
This packages an existing Windows executable. It does not compile or test Windows code.
"""
from pathlib import Path
import hashlib,zipfile,json,shutil,argparse,urllib.request
p=argparse.ArgumentParser();p.add_argument('--runtime',type=Path,required=True);p.add_argument('--checksums',type=Path,required=True);p.add_argument('--out',type=Path,required=True);args=p.parse_args()
root=Path(__file__).resolve().parents[1];version='45.3.2';name=f'electron-v{version}-win32-x64.zip'
expected=next(line.split()[0]for line in args.checksums.read_text().splitlines()if line.endswith(name))
actual=hashlib.sha256(args.runtime.read_bytes()).hexdigest()
if expected!=actual:raise RuntimeError('Electron checksum mismatch')
appdir=args.out/'Zwierzaczkowa-Przygoda-Windows';appdir.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(args.runtime)as z:z.extractall(appdir)
(appdir/'electron.exe').rename(appdir/'Zwierzaczkowa Przygoda.exe')
app=appdir/'resources/app';app.mkdir(parents=True,exist_ok=True)
for filename in['main.cjs','preload.cjs','package.json']:shutil.copy2(root/'desktop'/filename,app/filename)
shutil.copy2(root/'dist/index.html',app/'index.html')
for filename in['README.md','RAPORT_TESTOW.md','LICENCJE.md']:shutil.copy2(root/filename,appdir/filename)
(appdir/'URUCHOMIENIE.txt').write_text('ZWIERZACZKOWA PRZYGODA\n\nRozpakuj CAŁY folder. Uruchom plik Zwierzaczkowa Przygoda.exe.\nNie przenoś samego EXE poza folder.\nGra działa bez internetu i bez instalatora. Windows 10/11, 64-bit.\n← → ruch, spacja skok, Esc pauza.\n\nPaczkę przygotowano na Linuksie. Nie uruchamiano jej na Windows.\n',encoding='utf-8-sig')
(appdir/'BUILD.json').write_text(json.dumps({'appVersion':json.loads((root/'package.json').read_text())['version'],'electron':version,'platform':'win32','arch':'x64','runtimeSha256':actual,'windowsRuntimeTested':False,'renderer':'Phaser 3.90.0 / Canvas 2D FullHD','networkRequired':False},indent=2))
shutil.copytree(root/'licenses',appdir/'licenses',dirs_exist_ok=True)
shutil.copy2(root/'assets/fonts/OFL.txt',appdir/'licenses/Nunito-OFL.txt')
print('Packaged',appdir)
