import logo from "@/app/assets/project_devens_logo.png";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Information } from "../features/homepage/components/information";

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
      <li key={page.key}>
        <Link
          className="text-gray-100 text-xl inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:brightness-90 hover:bg-neutral-700 hover:border-red-700 transition-all ease-in-out duration-500"
          href={page.link}
        >
          {page.name}
        </Link>
        <SignedIn>
          <Link
            className="text-gray-100 text-xl inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:brightness-90 hover:bg-neutral-700 hover:border-red-700 transition-all ease-in-out duration-500"
            href={"/admin"}
          >
            Admin
          </Link>
        </SignedIn>
      </li>
    );
  });

  return (
    <main>
      <nav className="bg-neutral-800">
        <div className="container mx-auto">
          <ul className="flex justify-end">{links}</ul>
        </div>
      </nav>

      <div className="flex justify-center py-10 w-3/4 mx-auto">
        <Image src={logo} alt="PROJECT.Devens Logo" height={100} />
      </div>
      <Information />
    </main>
  );
}
