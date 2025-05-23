/*
 * Komponenta ShowCard prikazuje karticu s osnovnim informacijama o seriji.
 * 
 * - Prikazuje sliku serije (ili rezervnu sliku ako nema dostupne).
 * - Ime serije ispod slike.
 * - Klikom na karticu korisnik se preusmjerava na detaljnu stranicu te serije (/serija/[id]).
 * - Podržava opciju `priority` za optimizaciju učitavanja slike (za važnije slike koristi eager loading).
 * - Stilizirana je pomoću Tailwind CSS-a za lijep i responzivan prikaz.
 * 
 * Props:
 *  - id: jedinstveni identifikator serije, koristi se za generiranje linka.
 *  - name: ime serije, koristi se i za alt tekst slike.
 *  - image: opcionalni objekt s URL-om slike u svojstvu `medium`.
 *  - priority: opcionalna boolean vrijednost koja označava treba li slika imati prioritet pri učitavanju.
 */

import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
  name: string;
  image?: { medium: string };
  priority?: boolean;
};

export default function ShowCard({ id, name, image, priority = false }: Props) {
  return (
    <Link href={`/serija/${id}`} passHref>
      <div className="border p-2 rounded hover:shadow-md text-center cursor-pointer">
        <div className="relative w-full h-64">
          <Image
            src={image?.medium || "/placeholder.jpg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover rounded-md"
            priority={priority}
            loading={priority ? "eager" : "lazy"} // ključna optimizacija učitavanja slike
          />
        </div>
        <h3 className="mt-2 text-sm font-semibold">{name}</h3>
      </div>
    </Link>
  );
}
