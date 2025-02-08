import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getUser() {
  const { userId, redirectToSignIn } = await auth();
  const user = await currentUser();

  if (userId !== null && user !== null) {
    const insertedUser = (
      await db
        .insert(usersTable)
        .values({
          clerkUserId: userId,
          email: user.emailAddresses[0].emailAddress,
          name: user.username ?? "",
        })
        .onConflictDoUpdate({
          target: usersTable.clerkUserId,
          set: {
            email: user.emailAddresses[0].emailAddress,
            name: user.username ?? "",
          },
        })
        .returning()
    )[0];

    const dbUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.userId, insertedUser.userId),
      with: {
        clubs: true,
        roles: {
          columns: {
            role: true,
          },
        },
      },
    });

    return {
      user: dbUser || null,
      redirectToSignIn,
    };
  }

  return {
    user: null,
    redirectToSignIn,
  };
}

export async function getUsers() {
  return db.query.usersTable.findMany({
    with: {
      clubs: true,
    },
  });
}

export async function getUserByDbId(userId: string) {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.userId, userId),
    with: {
      clubs: {
        with: {
          club: true,
        },
      },
      roles: true,
    },
  });
}
