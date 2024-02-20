import { RowDataPacket } from "mysql2";

export type EventType = RowDataPacket & {
  typeName: string;
  filterText: string;
  labelText: string;
  color: "orange" | "blue" | "purple";
  disabledColor: string;
  enabledColor: string;
};

export type Club = RowDataPacket & {
  clubId: string;
  name: string;
};

export type Event = RowDataPacket & {
  id: number;
  name: string;
  slug: string;
  startDate: Date;
  endDate: Date;
  link: string;
  clubId: string;
  clubName: string;
  eventTypeName: string;
  color: string;
};
