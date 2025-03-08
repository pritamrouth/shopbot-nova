
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  className?: string;
  centered?: boolean;
}

const SectionHeading = ({ title, className, centered = true }: SectionHeadingProps) => {
  return (
    <h2 
      className={cn(
        "text-2xl md:text-3xl font-bold mb-8", 
        centered && "text-center", 
        className
      )}
    >
      {title}
    </h2>
  );
};

export default SectionHeading;
