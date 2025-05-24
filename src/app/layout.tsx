import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

// Uvoz Google fonta Inter s latin subsetom
const inter = Inter({ subsets: ["latin"] });

/*
 * Metadata za cijelu aplikaciju:
 * - title: naslov stranice koji se prikazuje u tab-u preglednika
 * - description: meta opis za SEO i prikaz na tražilicama
 */
export const metadata: Metadata = {
  title: "TV Maze Serije",
  description: "Prikaz najboljih serija s TVMaze API-ja",
};

/*
 * RootLayout komponenta služi kao glavni layout aplikacije.
 * 
 * - Omotava cijelu aplikaciju HTML strukturom.
 * - Postavlja jezik na hrvatski ("hr").
 * - Uključuje globalne stilove i fontove.
 * - Renderira fiksni header s logom i navigacijom.
 * - Renderira glavni sadržaj kroz `children`.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body className={inter.className}>
        <header className="border-b shadow-sm bg-black text-white">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            {/* Logo koji vodi na početnu stranicu */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-[180px] h-[50px]">
                <Image
                  src="/tvmaze-logo.png"
                  alt="TV Maze Logo"
                  fill
                  priority
                  sizes="(max-width: 768px) 150px, 180px"
                  className="object-contain"
                />
              </div>
            </Link>

            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-400 transition-colors font-medium"
                  >
                    Početna stranica
                  </Link>
                </li>
                <li>
                  <Link
                    href="/favorites"
                    className="hover:text-blue-400 transition-colors font-medium"
                  >
                    Favoriti
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}
