import Link from "next/link";
import { BsPlusCircle } from "react-icons/bs";

export interface ButtonLinkProps {
    text: string;
    link: string;
    color: string;
}

const ButtonLink = ({ text, link, color }: ButtonLinkProps) => {
    const styles = `mb-2 mr-2 inline-flex items-center rounded-lg bg-${color}-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-${color}-700`;

    return (
        <Link href={link} className={styles}>
            <BsPlusCircle className="-ml-1 mr-2 h-5 w-5" />
            {text}
        </Link>
    );
};

export default ButtonLink;
