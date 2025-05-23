/*
 * API ruta za upravljanje favoritima pohranjenim u cookie-ima.
 * 
 * GET:
 * - Dohvaća cookie "favorites" koji sadrži JSON niz ID-eva serija.
 * - Ako cookie ne postoji ili nije valjan JSON, vraća prazan niz.
 * - Vraća JSON niz favorit serija.
 * 
 * POST:
 * - Prima JSON objekt s jednim svojstvom `id` (broj).
 * - Dohvaća postojeći cookie "favorites".
 * - Parsira cookie u niz ID-eva, ili kreira prazan niz ako cookie ne postoji ili je neispravan.
 * - Dodaje novi `id` u niz samo ako već nije prisutan.
 * - Sprema ažurirani niz natrag u cookie "favorites".
 * - Vraća JSON odgovor s potvrdom i ažuriranim nizom favorita.
 */

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// GET handler - dohvat favorita iz cookie-a
export async function GET() {
  const cookieStore = await cookies(); // Dohvati sve cookie-e
  const raw = cookieStore.get("favorites")?.value || "[]"; // Uzmi cookie "favorites" ili prazan JSON niz

  let favorites: number[] = [];
  try {
    favorites = JSON.parse(raw); // Parsiraj cookie u niz brojeva
  } catch {
    favorites = []; // Ako je JSON nevaljan, koristi prazan niz
  }

  return NextResponse.json(favorites); // Vrati niz kao JSON odgovor
}

// POST handler - dodavanje novog favorita
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const raw = cookieStore.get("favorites")?.value || "[]";

  let favorites: number[] = [];
  try {
    favorites = JSON.parse(raw);
  } catch {
    favorites = [];
  }

  const { id } = await req.json(); // Čitaj id iz tijela POST zahtjeva

  if (!favorites.includes(id)) {
    favorites.push(id); // Dodaj id ako već nije u favoritima
  }

  const response = NextResponse.json({ success: true, favorites }); // Pripremi JSON odgovor

  // Spremi ažurirani niz u cookie
  response.cookies.set("favorites", JSON.stringify(favorites), {
    path: "/",       // Cookie dostupan na cijelom webu
    httpOnly: false, // Cookie može biti dostupan klijentskom JS-u (možeš podesiti i na true ako želiš veću sigurnost)
  });

  return response;
}
