import Landing from "@/components/landing/Landing";
import NavbarLanding from "@/components/navbar/NavbarLanding";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <NavbarLanding />
      <Landing />
    </main>
  );
}
