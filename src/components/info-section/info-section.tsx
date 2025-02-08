import { Card } from "@/components/card/card";
import { Header2 } from "@/components/header/headers";

export const InfoSection = ({
  header,
  body,
}: {
  header: React.ReactNode;
  body: React.ReactNode;
}) => {
  return (
    <div>
      <Header2>{header}</Header2>
      <Card>{body}</Card>
    </div>
  );
};
