/*
 * Komponenta EpizodeButton prikazuje stilizirani gumb koji vodi korisnika na stranicu s popisom epizoda za odabranu seriju.
 * Koristi se Link iz Next.js-a kako bi se omogućila klijentska navigacija bez reloadanja stranice.
 */

import Link from "next/link";

interface EpizodeButtonProps {
  showId: number; // ID serije koji se koristi za dinamičko generiranje rute
}

export default function EpizodeButton({ showId }: EpizodeButtonProps) {
  return (
    <Link
      href={`/serija/${showId}/epizode`}
      className="inline-flex justify-center items-center bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded"
    >
      Epizode
    </Link>
  );
}
