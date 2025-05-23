"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/components/BackButton";
import Link from "next/link";

/*
 * Tip podataka za epizodu serije.
 * - id: jedinstveni identifikator epizode
 * - name: naziv epizode
 * - season: broj sezone
 * - number: broj epizode unutar sezone
 */
type Episode = {
  id: number;
  name: string;
  season: number;
  number: number;
};

/*
 * Komponenta EpizodePage prikazuje popis epizoda za određenu seriju.
 * 
 * - Dohvaća ID serije iz URL parametara putem `useParams`.
 * - Koristi `useEffect` za dohvat epizoda sa TVMaze API-ja kad se ID promijeni.
 * - Sprema epizode u stanje i prikazuje ih u listi.
 * - Svaka epizoda je link na detaljnu stranicu te epizode.
 * - Prikazuje gumb za povratak natrag.
 * - Dok se epizode ne učitaju, prikazuje poruku "Učitavanje epizoda...".
 */
export default function EpizodePage() {
  // Dohvat URL parametara (npr. id serije)
  const params = useParams();
  const id = params?.id;

  // Stanje za pohranu epizoda
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    // Ako nema id ili je id niz, ne radi ništa
    if (!id || Array.isArray(id)) return;

    // Funkcija za dohvat epizoda preko API-ja
    const fetchEpisodes = async () => {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
      const data = await res.json();
      setEpisodes(data);
    };

    fetchEpisodes();
  }, [id]);

  // Ako još nema epizoda, prikazi loading poruku
  if (!episodes.length) return <p>Učitavanje epizoda...</p>;

  return (
    <div className="p-4">
      {/* Gumb za povratak */}
      <div className="mb-4">
        <BackButton />
      </div>

      <h1 className="text-2xl font-bold text-center mb-4">Epizode</h1>

      {/* Lista epizoda */}
      <ul className="space-y-4">
        {episodes.map((episode) => (
          <li
            key={episode.id}
            className="bg-white p-4 rounded shadow hover:bg-gray-100 transition"
          >
            <Link href={`/serija/${id}/epizode/${episode.id}`}>
              <div className="cursor-pointer">
                <h3 className="text-lg text-black hover:underline font-semibold">
                  {episode.name} (Sezona {episode.season}, Epizoda {episode.number})
                </h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
