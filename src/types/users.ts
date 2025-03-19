export const userRoles = ["user", "calendar", "pax", "admin"] as const;
export type UserRole = (typeof userRoles)[number];
