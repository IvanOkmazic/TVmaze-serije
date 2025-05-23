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
 * @param request Request objekt (nije korišten osim za tip)
 * @param params Objekt s parametrima URL-a, očekuje se id kao string
 * @returns NextResponse s JSON objektom i ažuriranim cookiejem
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const idToRemove = parseInt(id, 10);

  // cookies() nije async, poziva se sinhrono
  const cookieStore = await cookies();

  const raw = cookieStore.get("favorites")?.value || "[]";

  let favorites: number[] = [];
  try {
    favorites = JSON.parse(raw);
  } catch {
    favorites = [];
  }

  const updatedFavorites = favorites.filter((favId) => favId !== idToRemove);

  const response = NextResponse.json({ success: true });

  response.cookies.set("favorites", JSON.stringify(updatedFavorites), {
    path: "/",
    httpOnly: false,
  });

  return response;
}
