# Grafika i animacje

`assets/environment/*.{webp,png}`: cztery tła, atlas ośmiu dekoracji i atlas czterech rodzajów terenu. Materiały wygenerowano oryginalnie za pomocą narzędzia generowania obrazów. Kierunek: pogodny, nasycony, wysokiej jakości render stylizowanych form 3D, miękkie światło i cienie, bez strasznych motywów. To renderowane obrazy 2D, a nie modele 3D ani silnik Unreal.

`assets/characters/fox-walk.png`: źródłowy pasek ośmiu faz chodu. `fox-atlas.png` i plik JSON: równe klatki 384×448, wspólna skala i kotwica dolna. Stanie, skok, spadanie, lądowanie, zbieranie i radość mają własną prezentację zależną od stanu: wybrane pozy, łagodne transformacje, oddech, ugięcie i podskoki. Nie wymagają zmiany fizyki.

`src/art.js` przechowuje oryginalne funkcje ilustracyjne używane do ikon, drobnych dekoracji i alternatywnego rysowania. `src/renderer.js` łączy obrazy, animacje, materiały terenu, monet, gwiazdki, flag i bramy. Zasoby mają semantyczne nazwy w `ASSET_MANIFEST`.

Normalizacja atlasów odbywa się przez kadrowanie komórek, usuwanie przezroczystych marginesów, wspólne przeskalowanie i wyrównanie do kotwicy. Nie generowano każdej klatki oddzielnie. Zachowano źródła do dalszej edycji. Do zbudowania gry nie potrzeba narzędzia generatywnego ani internetu poza jednorazowym pobraniem zależności deweloperskich.

## Aktualizacja 2.0

Dodano oryginalne atlasy `rabbit-atlas.png` i `hamster-atlas.png` oraz źródłowe paski 8 klatek i podglądy. Królik jest kremowy, z długimi uszami, a chomik złoto-miodowy, z białym brzuszkiem; obaj noszą turkusowe chustki. Obrazy wygenerowano jako pełne paski i znormalizowano do klatek 384×448 ze wspólną skalą i kotwicą [192,434]. Brak indywidualnego skalowania kolejnych klatek. Pozy skoku, spadania, lądowania, zbierania i radości wywodzą się z tych atlasów oraz transformacji zależnych od stanu.

Powiększono zwierzęta w otoczeniu. Przebudowano rysowanie wielkich trampolin i dodano osobne prezentacje zwykłej gwiazdki oraz większej supergwiazdki. Wysokie ściany terenu używają także materiału poniżej pierwszego kafelka. Tła i wszystkie postacie pozostają obrazami 2D o wyglądzie renderowanych form 3D.

## Aktualizacja 3.0

Dodano dwa oryginalne atlasy: `polish-v3-props.png` (krab, trampolina, flaga koralowa i zielona) oraz `polish-v3-platforms.png` (drewniany pomost i tratwa). Zachowano źródła i JSON z kotwicami oraz powierzchniami. Wyrównanie platform odbywa się przez `surfaceY`, a trampolina jednocześnie dopasowuje matę i nóżki do fizyki.

Kotwice starego atlasu dekoracji zmierzono przy dolnych, nieprzezroczystych korzeniach. Szczególnie palma ma podstawę przesuniętą względem środka całej klatki. Metadane są w `ground-anchors.json` i `src/art-metadata.js`. `src/presentation.js` wymaga płaskiego podparcia całej podstawy, więc nie stawia drzew nad krawędzią lub wodą.
