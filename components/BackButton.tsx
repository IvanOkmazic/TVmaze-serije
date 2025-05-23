/*
 * Komponenta BackButton prikazuje gumb koji vraća korisnika na prethodnu stranicu u povijesti navigacije.
 * Koristi se kada želimo omogućiti lak povratak bez eksplicitnog definiranja rute.
 */

"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter(); // Hook koji omogućuje imperativnu navigaciju unutar klijentske komponente

  function handleClick() {
    router.back(); // Navigira natrag u povijesti pregledača, ekvivalentno "window.history.back()"
  }

  return (
    <button
      onClick={handleClick}
      className='bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded'
    >
      Natrag
    </button>
  );
}
