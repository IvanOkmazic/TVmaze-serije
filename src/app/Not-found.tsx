import Link from "next/link";

export default function NotFound() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">404 - Stranica nije pronađena</h1>
        <p className="mb-6">Nažalost, tražena stranica ne postoji ili je premještena.</p>
        <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Povratak na početnu
        </Link>
      </div>
    );
  }
  