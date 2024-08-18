import Landing from "@/components/landing/Landing";
import NavbarLanding from "@/components/navbar/NavbarLanding";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="bg-secondary-color min-h-screen flex items-center flex-col">
        <NavbarLanding />
        <Landing />
      </div>
    </main>
  );
}
