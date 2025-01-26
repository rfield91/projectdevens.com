export type Club = {
  clubId: string;
  name: string;
  slug: string;
};

export type EventType = {
  typeId: string;
  name: string;
  slug: string;
};

export type Event = {
  eventId: string;
  typeId: string;
  clubId: string;
  startsAt: Date;
  endsAt: Date;
  slug: string;
  url: string | null;
  title: string;
  description: string | null;
  club: Club;
  type: EventType;
};

export type Filters = {
  excludedEventTypes: string[];
  excludedClubs: string[];
};
