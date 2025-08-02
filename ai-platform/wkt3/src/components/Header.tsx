import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 bg-brand text-white flex justify-between">
      <h2 className="text-xl font-bold">WKT3</h2>
      <nav>
        <Link href="/" className="mr-4 hover:underline">
          Home
        </Link>
        <a href="/auth/register" className="hover:underline">
          Register
        </a>
      </nav>
    </header>
  );
}
