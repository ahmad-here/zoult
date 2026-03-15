import Image from "next/image";
import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection";
import Socialmedia from "@/components/Socialmedia";
export default function Home() {
  return (
    <div className="mb-10">
      <Navbar />
      <Herosection />
    </div>
  );
}

    