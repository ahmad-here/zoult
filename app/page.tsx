import Image from "next/image";
import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection";
import Socialmedia from "@/components/Socialmedia";
export default function Home() {
  return (
    <div className="mb-10">
      <Navbar />
      <Herosection />
      <Socialmedia className="md:flex-col md:absolute md:bottom-10 md:left-20 md:space-y-6 md:items-start"/>
    </div>
  );
}

    