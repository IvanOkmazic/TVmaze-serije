/*
 * FavoriteButton komponenta omogućuje korisniku dodavanje ili uklanjanje određene serije iz favorita.
 * Koristi se lokalno stanje za trenutno praćenje je li serija u favoritima, a API pozivi služe za trajnu pohranu na serveru.
 * 
 * - useEffect se koristi za dohvaćanje postojećih favorita nakon što se komponenta prikaže.
 * - toggleFavorite funkcija šalje POST ili DELETE zahtjev, ovisno o trenutnom statusu, za ažuriranje favorita.
 * - Cijeli tok osigurava UX bez ponovnog učitavanja stranice.
 */

"use client"

import { useEffect, useState } from "react"

type Props = {
  showId: number // ID serije koja se dodaje/uklanja iz favorita
}

export default function FavoriteButton({ showId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false)

  // Prilikom mountanja komponente, dohvaća se popis spremljenih favorita i provjerava je li trenutni show među njima.
  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await fetch("/api/favorites")
      const data: number[] = await res.json()
      setIsFavorite(data.includes(showId))
    }

    fetchFavorites()
  }, [showId])

  // Funkcija koja na klik ažurira stanje favorita (POST za dodavanje, DELETE za uklanjanje)
  const toggleFavorite = async () => {
    if (isFavorite) {
      const res = await fetch(`/api/favorites/${showId}`, { method: "DELETE" });
      console.log('DELETE status:', res.status);
      if (res.ok) {
        setIsFavorite(false);
      } else {
        console.error('Brisanje iz favorita nije uspjelo');
      }
    } else {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: showId }),
      });
      console.log('POST status:', res.status);
      if (res.ok) {
        setIsFavorite(true);
      } else {
        console.error('Dodavanje u favorite nije uspjelo');
      }
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-4 py-2 rounded ${
        isFavorite ? "bg-red-600 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {isFavorite ? "🗑️ Ukloni iz favorita" : "❤️ Dodaj u favorite"}
    </button>
  )
}
