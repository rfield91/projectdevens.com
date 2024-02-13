import PaxCalculator from "@/components/pax/pax-calculator";
import { PaxData } from "@/library/types/pax/types";

export default async function Page() {
  const res = await fetch(
    "https://resultsblobstorage.blob.core.windows.net/projectdevens/pax/pax.json"
  );
  const data = (await res.json()) as PaxData;

  // console.log(data);

  const classCategories = Object.keys(data);

  return (
    <div>
      <PaxCalculator paxData={data} />
    </div>
  );
}
