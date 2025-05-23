"use client";

import { useEffect, useState } from "react";
import ShowCard from "@/components/ShowCard";
import BackButton from "@/components/BackButton";

/*
 * Tip podataka za seriju.
 * - id: jedinstveni identifikator serije
 * - name: ime serije
 * - image: objekt sa slikom, sa svojstvom medium koje sadrži URL slike
 */
type Show = {
  id: number;
  name: string;
  image: { medium: string };
};

/*
 * Komponenta FavoritesPage prikazuje listu serija koje je korisnik označio kao favorite.
 * 
 * - Prvo dohvaća listu ID-jeva favorit serija iz API-ja (/api/favorites).
 * - Zatim za svaki ID dohvaća detalje serije sa TVmaze API-ja.
 * - Prikazuje poruku ako nema spremljenih serija.
 * - Prikazuje serije u grid layoutu koristeći ShowCard komponentu.
 * - Uključuje BackButton za vraćanje na prethodnu stranicu.
 */
export default function FavoritesPage() {
  // State za listu omiljenih serija
  const [favoriteShows, setFavoriteShows] = useState<Show[]>([]);

  // useEffect učitava favorite jednom prilikom mountanja komponente
  useEffect(() => {
    const loadFavorites = async () => {
      // Dohvati listu ID-jeva favorit serija iz vlastitog API-ja
      const res = await fetch("/api/favorites");
      const ids: number[] = res.ok ? await res.json() : [];

      // Za svaki ID dohvat detalja serije s TVmaze API-ja paralelno
      const fetched = await Promise.all(
        ids.map(async (id) => {
          const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
          return res.ok ? await res.json() : null;
        })
      );

      // Filter null vrijednosti (ako neka serija nije dohvaćena)
      setFavoriteShows(fetched.filter(Boolean));
    };

    loadFavorites();
  }, []);

  return (
    <main className="p-4">
      <div className="mb-4">
        <BackButton />
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">Moji favoriti❤️</h1>

      {favoriteShows.length === 0 ? (
        // Poruka ako nema spremljenih serija
        <p className="text-center text-gray-500">Još nema spremljenih serija</p>
      ) : (
        // Grid prikaz favorit serija
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favoriteShows.map((show) => (
            <ShowCard
              key={show.id}
              id={show.id}
              name={show.name}
              image={show.image}
              priority={false} // Nema prioriteta za eager loading
            />
          ))}
        </div>
      )}
    </main>
  );
}
