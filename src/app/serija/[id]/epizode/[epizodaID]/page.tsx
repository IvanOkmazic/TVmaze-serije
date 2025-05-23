import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";

/*
 * Tip za epizodu serije.
 * - name: naziv epizode
 * - season: sezona
 * - number: broj epizode u sezoni
 * - summary: opis epizode (HTML string)
 * - airdate: datum emitiranja
 * - runtime: trajanje epizode u minutama
 */
type Episode = {
  name: string;
  season: number;
  number: number;
  summary: string;
  airdate: string;
  runtime: number;
};

/*
 * EpisodeDetails komponenta dohvaća i prikazuje detalje o jednoj epizodi.
 *
 * - Parametar `params` dolazi iz Next.js routera i sadrži `epizodaID`.
 * - Koristi `await` za dohvat podataka epizode sa TVMaze API-ja.
 * - Ako epizoda ne postoji (fetch nije uspješan), poziva `notFound()` koji prikazuje 404 stranicu.
 * - Sigurno renderira sadržaj epizode uključujući naziv, sezonu, broj epizode, datum emitiranja, trajanje i opis.
 * - Opis se prikazuje pomoću `dangerouslySetInnerHTML` jer API vraća HTML string.
 * - Uključen je `BackButton` za povratak na prethodnu stranicu.
 */
export default async function EpisodeDetails({
  params,
}: {
  params: Promise<{ epizodaID: string }>;
}) {
  // Čekamo da se parametri riješe (async routing param)
  const resolvedParams = await params;

  // Dohvat podataka epizode prema ID-u iz parametara
  const res = await fetch(`https://api.tvmaze.com/episodes/${resolvedParams.epizodaID}`);

  // Ako epizoda nije pronađena, prikazujemo 404 stranicu
  if (!res.ok) return notFound();

  // Parsiramo podatke epizode u tip Episode
  const episode: Episode = await res.json();

  return (
    <div className="p-4">
      {/* Gumb za povratak */}
      <div className="mb-4">
        <BackButton />
      </div>

      {/* Glavni sadržaj epizode */}
      <div className="p-6 max-w-xl mx-auto bg-gray rounded shadow text-justify">
        <h1 className="text-2xl font-bold mb-2">{episode.name}</h1>
        <p className="text-gray-600 mb-2">
          Season {episode.season}, Episode {episode.number}
        </p>
        <p className="mb-2">
          <strong>Broadcast date: {episode.airdate}</strong>
        </p>
        <p className="mb-2">
          <strong>Duration: {episode.runtime} minutes</strong>
        </p>

        {/* Opis epizode - HTML string iz API-ja */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: episode.summary || "<p>Nema opisa.</p>" }}
        />
      </div>
    </div>
  );
}
