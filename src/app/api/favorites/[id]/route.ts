import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(request: NextRequest) {
  // Izvući id iz URL-a
  const url = new URL(request.url);
  const idParam = url.pathname.split("/").pop(); // posljednji segment

  if (!idParam) {
    return NextResponse.json({ success: false, error: "No ID provided" }, { status: 400 });
  }

  const id = parseInt(idParam, 10);

  if (isNaN(id)) {
    return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const raw = cookieStore.get("favorites")?.value || "[]";

  let favorites: number[] = [];
  try {
    favorites = JSON.parse(raw);
  } catch {
    favorites = [];
  }

  const updatedFavorites = favorites.filter(favId => favId !== id);

  const response = NextResponse.json({ success: true });
  response.cookies.set("favorites", JSON.stringify(updatedFavorites), {
    path: "/",
    httpOnly: false,
  });

  return response;
}
