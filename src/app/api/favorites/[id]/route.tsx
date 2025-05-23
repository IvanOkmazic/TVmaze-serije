import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/*
 * API handler za DELETE metodu koji briše seriju iz liste favorita.
 *
 * - Iz URL parametra dohvaća ID serije koju treba ukloniti.
 * - Iz cookieja 'favorites' dohvaća trenutnu listu favorit serija.
 * - Parsira cookie u niz brojeva, ili koristi prazan niz ako je nevaljan.
 * - Uklanja ID koji treba izbrisati iz liste favorita.
 * - Vraća JSON odgovor s potvrdom uspjeha.
 * - Ažurira cookie s novom listom favorita.
 *
 * @param _ Request objekt (nije korišten)
 * @param params Objekt s parametrima URL-a, očekuje se id kao string
 * @returns NextResponse s JSON objektom i ažuriranim cookiejem
 */
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  // Parsiraj id iz parametra u broj
  const idToRemove = parseInt(params.id, 10);

  // Dohvati cookie store 
  const cookieStore = await cookies();

  // Iz cookieja dohvati raw JSON string ili prazni niz kao string ako nema cookieja
  const raw = cookieStore.get("favorites")?.value || "[]";

  // Pokušaj parsirati JSON, ili koristi prazan niz ako je parsiranje neuspješno
  let favorites: number[] = [];
  try {
    favorites = JSON.parse(raw);
  } catch {
    favorites = [];
  }

  // Filteriraj niz da ukloniš ID koji treba biti izbrisan
  const updatedFavorites = favorites.filter((favId) => favId !== idToRemove);

  // Kreiraj JSON response s uspjehom
  const response = NextResponse.json({ success: true });

  // Postavi novi cookie s ažuriranom listom favorita
  response.cookies.set("favorites", JSON.stringify(updatedFavorites), {
    path: "/",       // cookie vrijedi za cijelu domenu
    httpOnly: false, // cookie dostupan i klijentskom JS-u
  });

  return response;
}
