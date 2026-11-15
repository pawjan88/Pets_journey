# Raport testów — wersja 3.0

15 listopada 2026. Aktualizacja istniejącej gry w Sites. Nie zmieniano jej odbiorców ani zapisu postępów.

## Wykonane sprawdzenia

**36 testów systemów i fizyki przeszło pomyślnie** (`npm test`). W ramach zestawu wykonano 12 pełnych tras na rzeczywistej symulacji 120 Hz: cztery światy × trzy zwierzątka. Każda trasa zebrała 40 zwykłych gwiazdek i 3 supergwiazdki, odwiedziła pierwszą tratwę, środkowy podest i drugą tratwę, pokonała dwie wysokie przeszkody i dotarła do mety bez ratowania. Agent wysyłał jedno polecenie naraz, bez teleportowania i dodawania przedmiotów. Osobny test przeprowadził także pełny menedżer gry przez cztery kolejne mety z zapisem i odblokowaniami.

Sprawdzono przeprawę przez wodę dla **dziewięciu faz początkowego ustawienia tratw**. Każda zakończyła się wyjściem na drugi brzeg, pobytem na wszystkich trzech podestach i zebraniem ruchomych gwiazdek oraz supergwiazdki. Czas przeprawy zależał od początkowej fazy i wyniósł około 12–25 sekund czasu symulacji.

| Element na świat | Wynik |
| --- | --- |
| Zwykłe gwiazdki | 40/40 |
| Supergwiazdki | 3/3 |
| Widoczne flagi | 3, wszystkie do 330 jednostek przed przepaścią |
| Platformy statyczne | 47, głównie w powietrzu |
| Ruchome tratwy nad wodą | 2 |
| Stały podest między tratwami | 1 |
| Wysokie drzewa/palmy do przeskoczenia | 2 |
| Podniesienia ziemi | 2 niskie |
| Dziury | 4, w tym podwójna i długa woda |

Dodatkowo sprawdzono: korzenie drzew i palm mają pełne podparcie oraz są pomijane przy krawędzi; nowe atlasy mają zgodne kotwice i powierzchnie; zwykły skok nie przechodzi przez wysokie przeszkody, a trampolina przenosi ponad nimi; gwiazdki podążają za tratwami; upadek do wody uruchamia bańkę i zachowuje zbiory. Utrzymano testy ruchu jednym klawiszem, coyote time, bufora skoku, braku automatycznych serii, ścian i granic świata, pomocy przy lądowaniu, stabilności ruchomych podestów, flag, kamery, importu i eksportu, migracji starego zapisu, wyboru postaci oraz pauzy.

Automatyczna trasa pełnego zbierania trwała około 182 sekund na świat i obejmowała około 51 zwykłych skoków. To czas testowego sterownika bez odpoczynku, a nie pomiar zabawy dziecka.

`npm run test:render` wykonał rendery Canvas w Node: cztery światy, trampolinę na ziemi, lot ponad wysokim drzewem, oba fragmenty przeprawy, wysoką palmę, flagę z krabem i galerię postaci. Obejrzano je jako obrazy FullHD. Nowe powierzchnie maty, pokładów i podstaw są wyrównane do fizyki; to nie są zrzuty przeglądarki.

`npm run build` wykonano rzeczywiście i zakończyło się powodzeniem. Sprawdzono składnię modułu JavaScript wyjętego z końcowego HTML. Archiwum publikacji porównano z tym zbudowanym plikiem i przesłanym commitem.

## Ograniczenia

Zarządzane Sites nie udostępniało `cua_repl.js`. Zgodnie z instrukcją nie uruchamiano alternatywnego serwera ani automatyzacji przeglądarki. **Nie wykonano nowego testu w przeglądarce hostowanej wersji ani testu z dzieckiem.** Publikację potwierdza osobno odpowiedź Sites. Nie budowano ponownie Windows EXE ani nie wykonywano subiektywnego odsłuchu.

Surowe wyniki: `test-results/physics-v3.json`, `test-results/render-v3.json`. Lokalne obrazy `test-results/v3-*.png` można odtworzyć skryptem renderującym. Wyników poprzednich wersji nie zaliczamy jako sprawdzeń tej aktualizacji.
