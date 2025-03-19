import logo from "@/app/assets/project_devens_logo.png";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export const AdminPrimaryNav = () => {
  return (
    <nav className="flex gap-4 container lg:w-3/4 mx-auto">
      <div className="mr-auto flex items-center gap-2">
        <Link href="/">
          <Image src={logo} height={28} alt="PROJECT.Devens Logo" />
        </Link>
      </div>
      <div className="size-8 self-center">
        <UserButton />
      </div>
    </nav>
  );
};
