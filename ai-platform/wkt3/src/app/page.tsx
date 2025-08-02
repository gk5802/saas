import Image from "next/image";

export default function HomePage() {
  return (
    <section className="p-4 text-center">
      <div className="w-full justify-center h-full flex mt-10 mb-10">

      <Image src="/bowler.jpg" alt="main" height={100} width={100}/>
      </div>
      <h1 className="text-3xl font-bold">Welcome to WKT3</h1>
      <p className="mt-2 text-lg">
        AI Powered Trading + Global Gaming Platform
      </p>
    </section>
  );
}
