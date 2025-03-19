"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type SideNavItemsProps = {
  name: string;
  href: string;
  icon: React.ReactElement<{ className?: string }>;
};

export const SideNavItem = ({ name, href, icon }: SideNavItemsProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        `relative flex items-center gap-2 py-0.5 
        border-b-2 border-transparent 
        hover:brightness-90 hover:border-red-700 
        transition-all ease-in-out duration-500 
        before:absolute before:left-[-20] before:block before:h-2 before:w-2 before:bg-red-700 before:rounded-full before:content-['']`,
        pathname.includes(href) ? "before:opacity-100" : "before:opacity-0"
      )}
    >
      {icon} {name}
    </Link>
  );
};
