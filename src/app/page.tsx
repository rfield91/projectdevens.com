import logo from "@/app/assets/project_devens_logo.png";
import Image from "next/image";
import Link from "next/link";
import { Information } from "./components/information";

export default function Home() {
  const pages = [
    {
      key: "calendar",
      name: "Calendar",
      link: "/calendar",
    },
    // {
    //   key: "paxCalculator",
    //   name: "PAX Calculator",
    //   link: "/pax",
    // },
  ];

  const links = pages.map((page) => {
    return (
      <li className="mx-6 mt-2" key={page.key}>
        <Link
          className="text-zinc-400 text-xl inline-block p-2 rounded-t-lg border-b-2 border-transparent hover:text-zinc-400 hover:border-zinc-400 transition-all ease-in-out"
          href={page.link}
        >
          {page.name}
        </Link>
      </li>
    );
  });

  return (
    <main className="">
      <div className="flex justify-center">
        <ul className="flex flex-col text-center">{links}</ul>
      </div>
      
      <div className="flex justify-center py-10 w-3/4 mx-auto">
        <Image src={logo} alt="PROJECT.Devens Logo" height={100}/>
      </div>

      

      <Information/>
    </main>
  );
}
