# Pets_journey — Zwierzaczkowa Przygoda

Kolorowa platformówka 2D dla dzieci. Wybierz liska, królika lub chomika i odkryj cztery światy. Zbieraj gwiazdki, skacz po platformach i przeprawiaj się przez wodę na tratwach. Proste sterowanie, trampoliny i magiczna bańka pomagają bawić się bez przegranej.

Wersja 3.0.0, FullHD 1920 × 1080, Game Studio i Phaser. Każdy świat zawiera 40 zwykłych gwiazdek i 3 supergwiazdki.

## Zmiany po kolejnym teście

- **47 platform w powietrzu** na świat, w tym sekwencje kolejnych skoków. Zostały tylko dwa niskie podniesienia ziemi; pod większością platform jest bezpieczna trasa do ćwiczenia.
- **Trzy widoczne flagi**, wyłącznie przed przepaściami. Początkowy punkt ratowania nadal istnieje wewnętrznie, ale nie jest rysowany jako dodatkowa flaga.
- **Długa woda** o szerokości 1360 jednostek: skok na pierwszą ruchomą tratwę, dopłynięcie i skok na stały środkowy podest, skok na drugą ruchomą tratwę, powrót na drugi brzeg. Tratwy mają szerokie pokłady, powolny ruch i delikatne wspomaganie lądowania. Zwykłe gwiazdki poruszają się razem z tratwami; supergwiazdka czeka na środkowym podeście.
- **Dwa wysokie drzewa lub palmy** na świat, których zwykły skok nie pokona. Trampolina nadaje wysoki lot po łuku, potrzebny do ich przeskoczenia. Zwykła prędkość pozostaje zwiększona o 20%; dodatkowy pęd dotyczy wyłącznie lotu z trampoliny.
- **Nowe grafiki 3D** krabów, trampolin, aktywnych i nieaktywnych flag, pomostów oraz tratw, dopasowane do zwierzątek. Powierzchnie graficzne platform są wyrównane do kolizji.
- **Poprawione podstawy drzew i palm**: kotwice odnoszą się do korzeni, a cała ich podstawa musi mieć płaskie podparcie. Dekoracje nie są stawiane na krawędziach ani nad wodą.

## Sterowanie i zapis

← → ruch, spacja pojedynczy skok, Esc pauza. Można nacisnąć strzałkę, puścić ją i dopiero nacisnąć spację. Na tratwie wystarczy podejść do brzegu, puścić strzałkę i nacisnąć skok. Postać jest przenoszona przez platformę także bez trzymania klawisza. Trampoliny uruchamiają się automatycznie. Przytrzymanie spacji nie powtarza skoków.

Nie ma przegranej, utraty życia, kar ani limitu czasu. Po upadku bańka odwozi postać do ostatniej flagi w około 1,6 s; zbiory zostają. Do ukończenia nie trzeba zbierać wszystkich przedmiotów. W kolejnej próbie wszystkie 40+3 przedmioty pojawiają się ponownie, a rekordy pozostają zapisane.

Zachowano format zapisu 2 oraz migrację starszego zapisu 1: odblokowania, ukończenia, rekordy supergwiazdek, wybór postaci i ustawienia dźwięku. Postępy są lokalne dla przeglądarki i adresu Sites. Kopię można wyeksportować lub wczytać w Ustawieniach.

## Źródła i budowanie

Node.js 20.19+: `npm ci`, `npm run dev` w środowisku lokalnym. `npm run build` tworzy samodzielny `dist/index.html` z osadzonymi zasobami i licencjami. Gotowy katalog `dist/` można udostępnić na hostingu statycznym; przenośna konfiguracja `.openai/hosting.json` wskazuje ten katalog.

`npm test` wykonuje testy fizyki, trasy i zapisy. `npm run test:render` rysuje rzeczywistą warstwę Canvas w Node i wymaga dostępnego `@napi-rs/canvas`. To nie jest test przeglądarkowy. Opcjonalny `npm run test:browser` przeznaczony jest do środowiska lokalnego z Playwright; w zarządzanym Sites należy korzystać z udostępnionego CUA. W tej sesji CUA nie było dostępne i nie uruchamiano podglądu przeglądarkowego ani nowego serwera.

## Moduły

`src/levels.js`: platformy, woda, tratwy, wysokie przeszkody i zbiory. `src/physics.js`: stały krok 120 Hz, kolizje, skoki, przenoszenie przez platformy, trampoliny i bańka. `src/presentation.js`: sprawdzanie podparcia dekoracji. `src/art-metadata.js`: kotwice korzeni i powierzchnie lądowania zmierzone na atlasach. `src/renderer.js`: wspólna prezentacja postaci, rekwizytów i świata. `src/assets.js`: manifest grafik. `src/save.js`: zgodny zapis. `src/game.js`: przebieg i odblokowania. `src/ui.js` i CSS: menu, wybór postaci, HUD i pauza.

Nowe oryginalne atlasy to `polish-v3-props.png` i `polish-v3-platforms.png` z metadanymi JSON oraz zachowanymi źródłami. Wyniki i ograniczenia w `RAPORT_TESTOW.md`. Aktualizacja dotyczy Sites; wcześniejszy plik Windows EXE nie był ponownie budowany w tym wydaniu.
