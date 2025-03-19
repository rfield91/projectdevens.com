import { clubsTable } from "@/db/schema";
import { userRoles } from "@/types/users";
import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", userRoles);

export const usersTable = pgTable("users", {
  userId: uuid().primaryKey().defaultRandom(),
  clerkUserId: text().notNull().unique(),
  email: text().notNull(),
  name: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  clubs: many(usersToClubsTable),
  roles: many(usersToRolesTable),
}));

export const usersToRolesTable = pgTable("userToRoles", {
  userId: uuid()
    .notNull()
    .references(() => usersTable.userId, { onDelete: "cascade" }),
  role: userRoleEnum().notNull(),
});

export const usersToRolesRelations = relations(
  usersToRolesTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToRolesTable.userId],
      references: [usersTable.userId],
    }),
  })
);

export const usersToClubsTable = pgTable(
  "usersToClubs",
  {
    userId: uuid()
      .notNull()
      .references(() => usersTable.userId, { onDelete: "cascade" }),
    clubId: uuid()
      .notNull()
      .references(() => clubsTable.clubId, { onDelete: "cascade" }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.clubId] })]
);

export const usersToClubsRelations = relations(
  usersToClubsTable,
  ({ one }) => ({
    club: one(clubsTable, {
      fields: [usersToClubsTable.clubId],
      references: [clubsTable.clubId],
    }),
    user: one(usersTable, {
      fields: [usersToClubsTable.userId],
      references: [usersTable.userId],
    }),
  })
);
