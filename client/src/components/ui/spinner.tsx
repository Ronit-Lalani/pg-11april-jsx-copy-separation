import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: string;
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12"
};

const Spinner = ({ size = "md", className, color }: SpinnerProps) => {
  return (
    <Loader2
      className={cn(
        "animate-spin",
        sizeMap[size],
        color ? color : "text-primary",
        className
      )}
    />
  );
};

export const PageSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-[200px]">
      <Spinner size="lg" />
    </div>
  );
};

export const FullPageSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="bg-card rounded-lg p-6 shadow-lg flex flex-col items-center gap-4">
        <Spinner size="xl" />
        <p className="text-card-foreground font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Spinner;