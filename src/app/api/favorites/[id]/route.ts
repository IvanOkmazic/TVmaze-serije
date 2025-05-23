import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/*
 * API ruta koja obrađuje DELETE zahtjev za uklanjanje ID-a iz cookie-ja "favorites".
 * 
 * Koristi se u Next.js app routeru kao server-side handler za brisanje favorita.
 */
export async function DELETE(request: NextRequest) {
  // Izvući ID serije iz URL-a (zadnji segment putanje)
  const url = new URL(request.url);
  const idParam = url.pathname.split("/").pop(); // uzmi zadnji segment URL path-a

  // Ako ID nije proslijeđen, vrati grešku 400
  if (!idParam) {
    return NextResponse.json({ success: false, error: "No ID provided" }, { status: 400 });
  }

  // Parsiraj ID u broj
  const id = parseInt(idParam, 10);

  // Ako ID nije broj, vrati grešku 400
  if (isNaN(id)) {
    return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
  }

  // Dohvati cookie "favorites" iz zahtjeva
  const cookieStore = await cookies();
  const raw = cookieStore.get("favorites")?.value || "[]";

  let favorites: number[] = [];
  try {
    // Pokušaj parsirati JSON niz iz cookie-ja
    favorites = JSON.parse(raw);
  } catch {
    // Ako JSON nije validan, postavi praznu listu favorita
    favorites = [];
  }

  // Ukloni ID koji želimo obrisati iz liste favorita
  const updatedFavorites = favorites.filter(favId => favId !== id);

  // Kreiraj JSON odgovor s uspjehom
  const response = NextResponse.json({ success: true });

  // Postavi novi cookie "favorites" sa ažuriranom listom (pretvorenom u string)
  response.cookies.set("favorites", JSON.stringify(updatedFavorites), {
    path: "/",         // cookie je dostupan na cijelom sajtu
    httpOnly: false,   // cookie je dostupan na client strani (ako želiš možeš postaviti na true)
  });

  // Vrati odgovor
  return response;
}
