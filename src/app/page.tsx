/*
 * Glavna stranica (HomePage) koja prikazuje najbolje ocijenjene serije.
 * 
 * - Asinkrono dohvaća serije s TVmaze API-ja.
 * - Filtrira serije koje imaju ocjenu (`rating.average`).
 * - Sortira ih po ocjeni, od najviše prema nižoj.
 * - Prikazuje komponentu za pretraživanje serija (SearchInput).
 * - Prikazuje listu serija (ShowsList) s dohvaćenim serijama.
 * 
 * Funkcija getShows:
 * - Dohvaća podatke s API-ja i koristi revalidaciju od 1 sat (3600 sekundi).
 * - Vraća sortirani i filtrirani niz serija.
 */

import SearchInput from "@/components/SearchInput";
import ShowsList from "@/components/ShowsList";

type Show = {
  id: number;
  name: string;
  image?: { medium: string };
  rating: { average: number };
};

// Dohvat serija s API-ja, filtriranje i sortiranje
async function getShows(): Promise<Show[]> {
  const res = await fetch("https://api.tvmaze.com/shows", {
    next: { revalidate: 3600 }, // ISR: ponovno dohvaćanje svakih sat vremena
  });
  const data = await res.json();

  // Filtriraj serije koje imaju ocjenu i sortiraj ih po ocjeni od najviše prema nižoj
  return data
    .filter((show: Show) => show.rating?.average)
    .sort((a: Show, b: Show) => b.rating.average - a.rating.average);
}

// Asinkrona glavna komponenta stranice
export default async function HomePage() {
  const shows = await getShows();

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">
        Najbolje ocijenjene serije ⭐⭐⭐⭐⭐
      </h1>
      <SearchInput />
      <ShowsList shows={shows} />
    </div>
  );
}
