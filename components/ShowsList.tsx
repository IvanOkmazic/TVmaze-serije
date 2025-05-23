/*
 * Komponenta ShowsList prikazuje listu serija u obliku mreže kartica (ShowCard).
 * 
 * - Prikazuje početni broj serija (default 20) i omogućuje učitavanje dodatnih serija po 5 klikom na gumb.
 * - Svaka kartica prikazuje osnovne informacije o seriji i koristi ShowCard komponentu.
 * - Koristi lokalni state za praćenje koliko serija je trenutno prikazano.
 * - Stilizirana je pomoću Tailwind CSS grid sistema za responzivan raspored.
 * 
 * Props:
 *  - shows: niz objekata serija koje će biti prikazane.
 * 
 * State:
 *  - displayedCount: broj trenutno prikazanih serija, inicijalno 20.
 * 
 * Funkcionalnost:
 *  - Klikom na gumb "Učitaj još" povećava se broj prikazanih serija za PAGE_SIZE (5).
 */

"use client";

import { useState } from "react";
import ShowCard from "./ShowCard";

type Show = {
  id: number;
  name: string;
  image?: { medium: string };
  rating: { average: number };
};

interface ShowsListProps {
  shows: Show[];
}

export default function ShowsList({ shows }: ShowsListProps) {
  const PAGE_SIZE = 5; // Broj serija koje se učitavaju svaki put kad se klikne gumb
  const [displayedCount, setDisplayedCount] = useState(20); // Koliko serija trenutno prikazujemo

  // Izrezujemo samo serije koje su u trenutnom "rasponu" za prikaz
  const displayedShows = shows.slice(0, displayedCount);

  return (
    <>
      {/* Grid za prikaz ShowCard komponenti */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {displayedShows.map((show, index) => (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image}
            priority={index < 3} // Prve 3 slike imaju prioritet pri učitavanju (eager loading)
          />
        ))}
      </div>

      {/* Gumb za učitavanje dodatnih serija, prikazuje se samo ako ima još serija za učitati */}
      {displayedCount < shows.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setDisplayedCount((count) => count + PAGE_SIZE)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Učitaj još
          </button>
        </div>
      )}
    </>
  );
}
