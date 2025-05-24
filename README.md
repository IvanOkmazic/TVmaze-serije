# 📺 TV Series Explorer — Pregled projekta

TV Maze Serije je moderna web aplikacija izrađena u Next.js (App Router), koja korisnicima omogućuje jednostavno pretraživanje, pregled i označavanje omiljenih TV serija korištenjem javnog TVMaze API-ja. Projekt koristi Tailwind CSS za stilizaciju, TypeScript za sigurnije tipiziranje, i omogućava proširivost (npr. uvođenje backenda s PostgreSQL-om).


## ✨ Funkcionalnosti

- 🔧 Ključne funkcionalnosti
- 🔍 Pretraga serija
-   Korisnici mogu pretraživati serije putem input polja.
-   Dohvaća podatke s TVMaze API-ja na osnovu upita u realnom vremenu (npr. ?q=breaking).
-   Rezultati se prikazuju kao grid kartica s naslovom i slikom.
- ⭐ Najbolje ocijenjene serije
-   Na početnoj stranici prikazuju se serije koje imaju dostupnu ocjenu (rating.average), sortirane od najviše prema nižoj.
-   Serije se dohvaćaju s API-ja i keširaju se na 1 sat putem Next.js revalidate.
- ❤️ Favoriti (lokalna pohrana)
-   Korisnik može dodati/ukloniti seriju iz favorita pomoću lokalnog localStorage.
-   Favoriti se prikazuju na zasebnoj /favorites stranici.
- 📃 Detalji serije
-   Klikom na seriju otvara se dinamička ruta /serija/[id] gdje se prikazuju:
-   Naziv, slika, ocjena, žanrovi, sažetak
-   Gumbi za prikaz glumaca i epizoda
- 🎭 Glumci i 📺 Epizode
-   Dodatni gumbi za dohvat i prikaz glumaca i epizoda za svaku seriju putem zasebnih komponenti.
- ⚠️ Fallback 404 stranica
-   Vlastita 404 stranica nalazi se u app/not-found.tsx i prikazuje se kada:
-   Korisnik pokuša otvoriti nepostojeću seriju (npr. /serija/999999)
-   Ili nepostojeću rutu (npr. /abc)


## 🚀 Tehnologije

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- TVMaze API
- PostgreSQL (planirano za backend pohranu favorita)

---

## 🛠️ Pokretanje projekta

```bash
npm install
npm run dev