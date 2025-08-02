import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 bg-brand text-white flex justify-between">
      <h2 className="text-xl font-bold">Wkt3</h2>
      <nav>
        <Link href="/" className="mr-4 hover:underline">
          Home
        </Link>
        <Link href="/auth/register" className="hover:underline">
          Register
        </Link>
        <Link href="/auth/login" className="mr-4 hover:underline">
          Login
        </Link>
        <Link href="/logout" className="hover:underline">
          Logout
        </Link>
      </nav>
    </header>
  );
}
