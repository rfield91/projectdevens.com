import { SideNavItem } from "@/features/admin/navigation/side-nav/side-nav-item";
import { UserRole } from "@/types/users";
import { CalendarDays, Group, SlidersHorizontal, Users } from "lucide-react";

export const SideNav = ({ roles }: { roles: UserRole[] }) => {
  const sections = [
    {
      heading: "Calendar",
      enabled: roles.includes("calendar"),
      items: [
        {
          key: "events",
          name: "Events",
          href: "/admin/calendar/events",
          icon: <CalendarDays size={16} />,
        },
        {
          key: "clubs",
          name: "Clubs",
          href: "/admin/calendar/clubs",
          icon: <Group size={16} />,
        },
        {
          key: "formats",
          name: "Formats",
          href: "/admin/calendar/formats",
          icon: <SlidersHorizontal size={16} />,
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
          icon: <Users size={16} />,
        },
      ],
    },
  ];

  const sideNavContent = sections
    .filter((s) => s.enabled)
    .map((section) => (
      <div key={section.heading}>
        <div className="text-sm font-light text-gray-600 mb-2">
          {section.heading}
        </div>
        <div className="flex flex-col">
          {section.items.map((page) => (
            <SideNavItem
              key={page.key}
              name={page.name}
              href={page.href}
              icon={page.icon}
            />
          ))}
        </div>
      </div>
    ));

  return <nav className="flex flex-col gap-4 mt-10">{sideNavContent}</nav>;
};
