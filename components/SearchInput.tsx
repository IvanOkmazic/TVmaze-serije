/*
 * Komponenta SearchInput prikazuje polje za unos teksta i gumb za pokretanje pretrage serija.
 * 
 * - Korisnik može upisati naziv serije u input polje.
 * - Pretraga se pokreće klikom na gumb "Pretraži" ili pritiskom tipke Enter.
 * - Ako uneseni tekst ima manje od 3 znaka, gumb je onemogućen i pretraga se neće izvršiti.
 * - Nakon pokretanja pretrage, korisnik se preusmjerava na stranicu s rezultatima (`/search?q=...`).
 * 
 * Implementirana je kao klijentska komponenta koristeći React hooks.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Funkcija koja se poziva kada korisnik pokrene pretragu (klik na gumb ili Enter)
  const handleSearch = () => {
    if (searchTerm.trim().length < 3) return; // Minimalno 3 znaka za pretragu
    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`); // Navigacija na stranicu s rezultatima
  };

  // Funkcija koja reagira na pritisak tipke u input polju
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(); // Pokreće pretragu pritiskom na Enter
    }
  };

  return (
    <div className="my-6 max-w-5xl mx-auto flex justify-center space-x-2">
      <input
        id="search-input"
        name="search"
        type="text"
        placeholder="Pretraži serije..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Ažurira stanje sa svakim unosom
        onKeyDown={handleKeyDown}
        className="px-4 py-2 border rounded text-black bg-white max-w-xs flex-shrink-0"
      />
      <button
        onClick={handleSearch}
        disabled={searchTerm.trim().length < 3} // Onemogući gumb ako unos nema 3+ znaka
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
      >
        Pretraži
      </button>
    </div>
  );
}
