import { PaxData } from "./types";

export async function getPaxData() {
  const url = process.env.PAX_DATA;

  if (!url) {
    throw new Error("Environment variable not set");
  }

  const res = await fetch(url);

  return (await res.json()) as PaxData;
}
