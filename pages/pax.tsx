import path from "path";
import PaxCalculator from "../components/paxCalculator/PaxCalculator";
import fsPromises from "fs/promises";
import Link from "next/link";
import Image from "next/image";

export async function getStaticProps() {
    const paxJsonPath = path.join(process.cwd(), "data/pax/pax.json");

    const paxValuesJson = (await fsPromises.readFile(paxJsonPath)).toString();

    console.log(paxValuesJson);

    return {
        props: {
            paxValuesJson: paxValuesJson,
        },
    };
}

const Pax = ({ paxValuesJson }) => {
    var json = JSON.parse(paxValuesJson);
    return (
        <div className="bg-slate-100">
            <div className="flex justify-center py-10">
                <Link href="/">
                    <Image
                        src="/images/project_devens_logo.png"
                        alt="PROJECT.Devens Logo"
                        width={150}
                        height={150}
                    />
                </Link>
            </div>
            <PaxCalculator paxValuesJson={json} />
        </div>
    );
};

export default Pax;
