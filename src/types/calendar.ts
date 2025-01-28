import { InferResultType } from "@/db/helpers";

export type Club = InferResultType<"clubsTable">;

export type EventType = InferResultType<"typesTable">;

export type Event = InferResultType<"eventsTable", { club: true; type: true }>;

export type Filters = {
  excludedEventTypes: string[];
  excludedClubs: string[];
};
