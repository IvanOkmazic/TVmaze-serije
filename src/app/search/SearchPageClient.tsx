"use client";

import { useSearchParams } from "next/navigation"; // hook za čitanje query parametara iz URL-a
import { useEffect, useState } from "react"; // React hookovi za side efekat i stanje
import ShowCard from "@/components/ShowCard"; // komponenta za prikaz kartice serije
import BackButton from "@/components/BackButton"; // komponenta za dugme nazad

// Tipovi podataka za seriju i rezultat pretrage
type Show = {
  id: number;
  name: string;
  image?: { medium: string };
};

type SearchResult = {
  show: Show;
};

export default function SearchPageClient() {
  // Dohvati query parametar "q" iz URL-a (npr. ?q=breaking)
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  // Stanja za rezultate pretrage i loading indikator
  const [results, setResults] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);

  // React efekat koji se izvršava kad se promijeni query
  useEffect(() => {
    // Ako je query kraći od 3 znaka, izbriši rezultate i ne radi fetch
    if (query.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true); // uključi loading indikator

    // Poziv na TVmaze API za pretragu serija po queryju
    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
      .then((res) => res.json()) // parsiraj JSON odgovor
      .then((data: SearchResult[]) => {
        // izvuci polje show iz svakog rezultata i spremi u stanje
        const shows = data.map((item) => item.show);
        setResults(shows);
      })
      .catch(() => setResults([])) // ako dođe do greške, postavi praznu listu
      .finally(() => setLoading(false)); // isključi loading indikator kad se fetch završi
  }, [query]);

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <div className="mb-4">
        <BackButton /> 
      </div>

      <h1 className="text-2xl font-bold mb-4">
        Rezultati pretrage za: &quot;{query}&quot; {/* prikaz trenutačnog upita */}
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
            priority={false} // slike pretraženih serija nisu prioritet za brže učitavanje
          />
        ))}
      </div>
    </main>
  );
}
