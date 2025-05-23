import Image from "next/image";
import BackButton from "@/components/BackButton";
import FavoriteButton from "@/components/FavoriteButton";
import GlumciButton from "@/components/GlumciButton";
import EpizodeButton from "@/components/EpizodeButton";
import NotFound from "../../Not-found";

type Show = {
  id: number;
  name: string;
  image?: { medium: string };
  rating: { average: number };
  genres: string[];
  summary?: string | null;
};

async function getShow(id: string): Promise<Show | null> {
  try {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

interface ShowDetaljiProps {
  params: Promise<{ id: string }>;
}

export default async function ShowDetalji({ params }: ShowDetaljiProps) {
  const { id } = await params;

  const show = await getShow(id);

  if (!show) {
    return <NotFound />;
  }

  const cleanSummary = show.summary ? show.summary.replace(/<[^>]*>/g, "") : "";

  return (
    <main className="flex flex-col items-center p-4">
      <div className="bg-gray border border-gray-300 rounded-lg shadow-md p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold capitalize mb-4">{show.name}</h1>
        <Image
          src={show.image?.medium || "/placeholder.jpg"}
          alt={show.name}
          width={210}
          height={295}
          className="mx-auto rounded-md object-cover"
          priority
        />
        <p className="mt-4">
          <strong>Rating:</strong> {show.rating?.average ?? "N/A"}
        </p>
        <p>
          <strong>Genre:</strong> {show.genres.join(", ")}
        </p>
        <p className="mt-1 text-sm">
          <strong>Summary:</strong> {cleanSummary}
        </p>
        <div className="flex space-x-4 mt-6">
          <BackButton />
          <FavoriteButton showId={show.id} />
          <GlumciButton showId={show.id} />
          <EpizodeButton showId={show.id} />
        </div>
      </div>
    </main>
  );
}
