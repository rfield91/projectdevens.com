import logo from "@/app/assets/project_devens_logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const pages = [
    {
      key: "calendar",
      name: "Calendar",
      link: "/calendar",
    },
    {
      key: "paxCalculator",
      name: "PAX Calculator",
      link: "/pax",
    },
  ];

  const links = pages.map((page) => {
    return (
      <li className="mx-6 mt-2" key={page.key}>
        <Link
          className="text-xl inline-block p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          href={page.link}
        >
          {page.name}
        </Link>
      </li>
    );
  });

  return (
    <main className="">
      <div className="flex py-10 w-3/4 mx-auto">
        <Image src={logo} alt="PROJECT.Devens Logo" />
      </div>

      <div className="flex justify-center">
        <ul className="flex flex-col text-center">{links}</ul>
      </div>
    </main>
  );
}
