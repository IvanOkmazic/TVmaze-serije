import Image from "next/image";
import BackButton from "@/components/BackButton";
import FavoriteButton from "@/components/FavoriteButton";
import GlumciButton from "@/components/GlumciButton";
import EpizodeButton from "@/components/EpizodeButton";
import NotFound from "../../Not-found";

type Show = {
  id: number;
  name: string;
  image?: { medium: string };
  rating: { average: number };
  genres: string[];
  summary?: string | null;
};

/*
 * Asinkrona funkcija koja dohvaća detalje serije po ID-u sa TVmaze API-ja.
 * Koristi Next.js revalidate opciju za keširanje odgovora 1 sat.
 * 
 * @param id - ID serije koju želimo dohvatiti
 * @returns Objekt serije tipa Show ili null ako dođe do greške ili serija ne postoji
 */
async function getShow(id: string): Promise<Show | null> {
  try {
    // Poziv na API za dohvat serije
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`, {
      next: { revalidate: 3600 }, // Keširanje podataka na 1 sat
    });
    if (!res.ok) return null; // Ako odgovor nije OK, vraćamo null
    const data = await res.json();
    return data; // Vraćamo podatke o seriji
  } catch {
    // U slučaju greške (npr. mrežni problemi) vraćamo null
    return null;
  }
}

interface ShowDetaljiProps {
  params: Promise<{ id: string }>;
}

/*
 * Server komponenta koja prikazuje detalje serije.
 * 
 * Koristi async/await za dohvat podataka serije prije renderiranja.
 * Ako serija nije pronađena, prikazuje komponentu NotFound.
 */
export default async function ShowDetalji({ params }: ShowDetaljiProps) {
  // Čekamo da se Promise params riješi i dohvaćamo id serije
  const { id } = await params;

  // Dohvaćamo podatke serije s API-ja
  const show = await getShow(id);

  // Ako nema serije s tim ID-em, vraćamo komponentu za 404 stranicu
  if (!show) {
    return <NotFound />;
  }

  // Uklanjamo HTML tagove iz opisa serije da prikažemo samo čist tekst
  const cleanSummary = show.summary ? show.summary.replace(/<[^>]*>/g, "") : "";

  return (
    <main className="flex flex-col items-center p-4">
      <div className="bg-gray border border-gray-300 rounded-lg shadow-md p-6 w-full max-w-md text-center">
        {/* Ime serije */}
        <h1 className="text-2xl font-bold capitalize mb-4">{show.name}</h1>

        {/* Slika serije ili placeholder ako nema slike */}
        <Image
          src={show.image?.medium || "/placeholder.jpg"}
          alt={show.name}
          width={210}
          height={295}
          className="mx-auto rounded-md object-cover"
          priority // Prioritetno učitavanje slike za brži prikaz
        />

        <p className="mt-4">
          <strong>Rating:</strong> {show.rating?.average ?? "N/A"}
        </p>
        <p>
          <strong>Genre:</strong> {show.genres.join(", ")}
        </p>
        <p className="mt-1 text-sm">
          <strong>Summary:</strong> {cleanSummary}
        </p>
        <div className="flex space-x-4 mt-6">
          {/* Vraća na prethodnu stranicu */}
          <BackButton />
          {/* Dodaje/uklanja seriju iz favorita */}
          <FavoriteButton showId={show.id} />
          {/* Prikazuje glumce serije */}
          <GlumciButton showId={show.id} />
          {/* Prikazuje epizode serije */}
          <EpizodeButton showId={show.id} />
        </div>
      </div>
    </main>
  );
}
