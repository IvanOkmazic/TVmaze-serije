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

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);

    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data: SearchResult[]) => {
        const shows = data.map((item) => item.show);
        setResults(shows);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
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
            priority={false}
          />
        ))}
      </div>
    </main>
  );
}
