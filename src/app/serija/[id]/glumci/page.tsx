"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/components/BackButton";

/*
 * Tip za člana glumačke postave.
 * - person: podaci o glumcu (id, ime, slika)
 * - character: podaci o ulozi koju glumac igra
 */
type CastMember = {
  person: {
    id: number;
    name: string;
    image?: { medium: string };
  };
  character: {
    name: string;
  };
};

/*
 * GlumciPage komponenta dohvaća i prikazuje glumačku postavu određene serije.
 * 
 * - Dohvaća ID serije iz URL parametara.
 * - Koristi useEffect za fetch podataka o glumcima sa TVMaze API-ja.
 * - Prikazuje listu glumaca s njihovim imenima, ulogama i slikama ako postoje.
 * - Uključuje BackButton za povratak na prethodnu stranicu.
 */
export default function GlumciPage() {
  const { id } = useParams();
  const [cast, setCast] = useState<CastMember[]>([]);

  useEffect(() => {
    if (!id) return;

    // Fetch podataka o glumcima serije sa zadanim ID-em
    fetch(`https://api.tvmaze.com/shows/${id}/cast`)
      .then((res) => res.json())
      .then((data) => setCast(data))
      .catch(() => setCast([])); // Dodano hvatanje greške za sigurnost
  }, [id]);

  return (
    <div className="p-4">
      {/* Gumb za povratak */}
      <div className="mb-4">
        <BackButton />
      </div>

      {/* Naslov stranice */}
      <h1 className="text-2xl font-bold text-center mb-6">Glumci🎭</h1>

      {/* Lista glumaca */}
      <ul className="space-y-2 max-w-xl mx-auto">
        {cast.map((member) => (
          <li
            key={`${member.person.id}-${member.character.name}`} // Kombinacija ID-a glumca i imena uloge kao jedinstveni ključ
            className="bg-gray p-4 rounded shadow flex items-center space-x-4"
          >
            {/* Slika glumca ako postoji */}
            {member.person.image?.medium && (
              <img
                src={member.person.image.medium}
                alt={member.person.name}
                className="w-16 h-20 object-cover rounded"
              />
            )}

            {/* Ime glumca i uloga */}
            <div>
              <p className="font-semibold">{member.person.name}</p>
              <p className="text-sm text-gray-600">Uloga: {member.character.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
