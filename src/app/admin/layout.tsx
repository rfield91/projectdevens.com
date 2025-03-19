import { AdminPrimaryNav } from "@/features/admin/navigation/primary-nav/primary-nav";
import { SideNav } from "@/features/admin/navigation/side-nav/side-nav";
import { getUser } from "@/services/user";

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
