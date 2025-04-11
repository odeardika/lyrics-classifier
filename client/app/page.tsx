import Header from "@components/Header/Header";
import Hero from "@/components/Section/Hero/Hero";


export default function Home() {
  return (
  <>
    <main>
      <Header />
      <main className="bg-gray-100">
        <Hero />
      </main>
    </main>
  </>
  );
}
