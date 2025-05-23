import Image from "next/image";
import BackButton from "@/components/BackButton";
import FavoriteButton from "@/components/FavoriteButton";
import GlumciButton from "@/components/GlumciButton";
import EpizodeButton from "@/components/EpizodeButton";
import NotFound from "../../Not-found";

/*
 * Tip Show opisuje strukturu podataka o seriji.
 * - id: jedinstveni identifikator serije
 * - name: naziv serije
 * - image: opcionalna slika (medium veličina)
 * - rating: prosječna ocjena serije
 * - genres: lista žanrova serije
 * - summary: opcionalni sažetak/opis serije, može biti null ili nepostojeći
 */
type Show = {
  id: number;
  name: string;
  image?: { medium: string };
  rating: { average: number };
  genres: string[];
  summary?: string | null;
};

/*
 * Funkcija getShow dohvaća podatke o seriji preko TVMaze API-ja.
 * - Prima ID serije kao argument
 * - Radi fetch sa postavkom revalidacije od 3600s (1 sat)
 * - Vraća objekt Show ili null ako dođe do greške ili serija ne postoji
 */
async function getShow(id: string): Promise<Show | null> {
  try {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

/*
 * Tip za props koji prima komponenta ShowDetalji.
 * - params: objekt koji sadrži id serije iz URL parametara
 */
interface ShowDetaljiProps {
  params: { id: string };
}

/*
 * Glavna komponenta koja prikazuje detalje o jednoj seriji.
 * - Dohvaća seriju preko getShow na osnovu ID-a iz params
 * - Ako serija ne postoji, prikazuje komponentu NotFound
 * - Prikazuje naziv, sliku, ocjenu, žanrove i sažetak serije
 * - Uključi navigacijske tipke: BackButton, FavoriteButton, GlumciButton i EpizodeButton
 */
export default async function ShowDetalji({ params }: ShowDetaljiProps) {
  // params je već objekt, nije potrebno await
  const { id } = params;
  
  // Dohvati podatke serije asinkrono
  const show = await getShow(id);

  // Ako serija nije pronađena, prikaži NotFound komponentu
  if (!show) {
    return <NotFound />;
  }

  // Očisti summary od HTML tagova ako postoji (za sigurniji prikaz)
  const cleanSummary = show.summary ? show.summary.replace(/<[^>]*>/g, "") : "";

  return (
    <main className="flex flex-col items-center p-4">
      {/* Glavni container za detalje serije */}
      <div className="bg-gray border border-gray-300 rounded-lg shadow-md p-6 w-full max-w-md text-center">
        {/* Naziv serije */}
        <h1 className="text-2xl font-bold capitalize mb-4">{show.name}</h1>
        
        {/* Slika serije ili placeholder ako slike nema */}
        <Image
          src={show.image?.medium || "/placeholder.jpg"}
          alt={show.name}
          width={210}
          height={295}
          className="mx-auto rounded-md object-cover"
          priority
          // placeholder="blur" // možeš koristiti blur placeholder ako imaš
        />

        {/* Prosječna ocjena serije ili "N/A" ako nema ocjene */}
        <p className="mt-4">
          <strong>Rating:</strong> {show.rating?.average ?? "N/A"}
        </p>

        {/* Žanrovi serije prikazani kao zarezom odvojeni string */}
        <p>
          <strong>Genre:</strong> {show.genres.join(", ")}
        </p>

        {/* Sažetak serije bez HTML tagova */}
        <p className="mt-1 text-sm">
          <strong>Summary:</strong> {cleanSummary}
        </p>

        {/* Navigacijski gumbi za povratak i dodatne informacije */}
        <div className="flex space-x-4 mt-6">
          <BackButton />
          <FavoriteButton showId={show.id} />
          <GlumciButton showId={show.id} />
          <EpizodeButton showId={show.id} />
        </div>
      </div>
    </main>
  );
}
