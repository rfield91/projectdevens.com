import Image from "next/image";
import Link from "next/link";

const Home = () => {
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
                    className="inline-block rounded-t-lg border-b-2 border-transparent p-2 text-xl hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                    href={page.link}
                >
                    {page.name}
                </Link>
            </li>
        );
    });

    return (
        <div className="h-screen bg-slate-100">
            <div className="flex justify-center py-10">
                <Image
                    src="/images/project_devens_logo.png"
                    alt="PROJECT.Devens Logo"
                    width={250}
                    height={250}
                />
            </div>

            <div className="flex justify-center">
                <ul className="flex flex-wrap">{links}</ul>
            </div>
        </div>
    );
};

export default Home;
