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
            <li className="mx-6 mt-2">
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
        <div>
            <div className="flex justify-center mt-10">
                <Image
                    src="/images/project_devens_logo.png"
                    alt="PROJECT.Devens Logo"
                    width={500}
                    height={500}
                />
            </div>

            <div className="flex justify-center">
                <ul className="flex flex-wrap">{links}</ul>
            </div>
        </div>
    );
};

export default Home;
