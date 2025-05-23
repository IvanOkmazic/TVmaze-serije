"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ShowCard from "@/components/ShowCard";
import BackButton from "@/components/BackButton";

type Show = {
  id: number;
  name: string;
  image?: { medium: string };
};

type SearchResult = {
  show: Show;
};

/*
 * Komponenta SearchPage omogućuje pretraživanje serija prema upisanom upitu.
 * 
 * - Čita query parametar "q" iz URL-a koristeći Next.js hook `useSearchParams`.
 * - Kada korisnik unese najmanje 3 znaka, izvršava fetch na TVmaze API za pretragu serija.
 * - Prikazuje loading poruku dok se podaci dohvaćaju.
 * - Prikazuje rezultate u mreži kartica (ShowCard komponenta).
 * - Ako nema rezultata, prikazuje poruku da rezultata nema.
 * - Uključuje BackButton za vraćanje na prethodnu stranicu.
 */
export default function SearchPage() {
  // Dohvat query parametra "q"
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  // State za rezultate pretrage i loading indikator
  const [results, setResults] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);

  // useEffect reagira na promjenu upita (query)
  useEffect(() => {
    if (query.length < 3) {
      // Ako je upit kraći od 3 znaka, resetiraj rezultate
      setResults([]);
      return;
    }

    setLoading(true);

    // Poziv API-ja za pretragu serija
    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data: SearchResult[]) => {
        // Mapiraj rezultat na listu serija (objekt show u svakom itemu)
        const shows = data.map((item) => item.show);
        setResults(shows);
      })
      .catch(() => setResults([])) // U slučaju greške prikaži praznu listu
      .finally(() => setLoading(false)); // Završetak učitavanja
  }, [query]);

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <div className="mb-4">
        <BackButton />
      </div>

      <h1 className="text-2xl font-bold mb-4">
        Rezultati pretrage za: &quot;{query}&quot;
      </h1>

      {loading && <p>Učitavanje...</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-500">Nema rezultata za &quot;{query}&quot;.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map((show) => (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image}
            priority={false} // Pretražene serije nisu prioritetne za eager loading
          />
        ))}
      </div>
    </main>
  );
}
