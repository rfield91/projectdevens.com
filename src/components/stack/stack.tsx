import { cn } from "@/lib/utils";

export const Stack = ({
  gap = "md",
  align = "left",
  children,
}: {
  gap?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}) => {
  let gapStyle = "";
  let alignStyle = "";

  switch (gap) {
    case "sm":
      gapStyle = "gap-4";
      break;
    case "md":
      gapStyle = "gap-6";
      break;
    case "lg":
      gapStyle = "gap-8";
      break;
  }

  switch (align) {
    case "left":
      alignStyle = "";
      break;
    case "center":
      alignStyle = "items-center";
      break;
    case "right":
      alignStyle = "items-end";
      break;
  }

  return (
    <div className={cn("flex flex-col", gapStyle, alignStyle)}>{children}</div>
  );
};
