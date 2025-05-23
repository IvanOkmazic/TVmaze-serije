/*
 * Komponenta GlumciButton prikazuje gumb koji vodi korisnika na stranicu s popisom glumaca određene serije.
 * Koristi se za dinamičku navigaciju prema URL-u temeljenom na ID-u serije (showId).
 */

import Link from "next/link";

interface GlumciButtonProps {
  showId: number;
}

export default function GlumciButton({ showId }: GlumciButtonProps) {
  return (
    <Link
      href={`/serija/${showId}/glumci`}
      className="inline-flex justify-center items-center bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded"  
    >
      Glumci
    </Link>
  );
}
