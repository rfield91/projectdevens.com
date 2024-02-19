import PaxCalculator from "@/components/pax/pax-calculator";
import { getPaxData } from "@/library/pax/repository";

export default async function Page() {
  const paxData = await getPaxData();

  return (
    <div>
      <PaxCalculator paxData={paxData} />
    </div>
  );
}
