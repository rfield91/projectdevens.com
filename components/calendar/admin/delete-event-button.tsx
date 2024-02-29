import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";

type DeleteEventButtonProps = {
  eventId: number;
  onClick: (eventId: number) => Promise<void>;
};

export function DeleteEventButton({
  eventId,
  onClick,
}: DeleteEventButtonProps) {
  return (
    <Button onClick={async () => await onClick(eventId)}>
      <FaTrash />
    </Button>
  );
}
