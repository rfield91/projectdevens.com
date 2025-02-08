import logo from "@/app/assets/project_devens_logo.png";
import { UserRole } from "@/schemas/users";
import { getUser } from "@/services/user";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (user.user === null) {
    return user.redirectToSignIn();
  }

  return (
    <div>
      <header className="flex h-12 shadow z-10">
        <AdminPrimaryNav />
      </header>
      <div className="container lg:w-3/4 mx-auto">
        <div className="flex gap-4">
          <div className="min-h-screen border-r-2 w-1/5 gap-2">
            <SideNav roles={user.user.roles.map((r) => r.role)} />
          </div>
          <main className="mt-12 w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}

const AdminPrimaryNav = () => {
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

const SideNav = ({ roles }: { roles: UserRole[] }) => {
  const sections = [
    {
      heading: "Calendar",
      enabled: roles.includes("calendar"),
      items: [
        {
          key: "events",
          name: "Events",
          href: "/admin/calendar/events",
        },
        {
          key: "clubs",
          name: "Clubs",
          href: "/admin/calendar/clubs",
        },
        {
          key: "formats",
          name: "Formats",
          href: "/admin/calendar/formats",
        },
      ],
    },
    {
      heading: "Management",
      enabled: roles.includes("admin"),
      items: [
        {
          key: "users",
          name: "Users",
          href: "/admin/users",
        },
      ],
    },
  ];

  const sideNavContent = sections
    .filter((s) => s.enabled)
    .map((section) => (
      <div key={section.heading}>
        <div className="text-sm font-bold mb-2">{section.heading}</div>
        <div className="flex flex-col">
          {section.items.map((page) => (
            <Link
              key={page.key}
              href={page.href}
              className="py-0.5 inline-block border-b-2 border-transparent hover:brightness-90 hover:border-red-700 transition-all ease-in-out duration-500"
            >
              {page.name}
            </Link>
          ))}
        </div>
      </div>
    ));

  return <nav className="flex flex-col gap-4 mt-10">{sideNavContent}</nav>;
};
