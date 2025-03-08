
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ViewAllButtonProps {
  to: string;
  className?: string;
}

const ViewAllButton = ({ to, className }: ViewAllButtonProps) => {
  return (
    <div className={cn("flex justify-center mt-8", className)}>
      <Link 
        to={to} 
        className="text-black hover:text-gray-700 font-medium inline-flex items-center"
      >
        View All
      </Link>
    </div>
  );
};

export default ViewAllButton;
