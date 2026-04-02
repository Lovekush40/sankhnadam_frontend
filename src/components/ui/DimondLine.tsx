import * as React from "react";
import { cn } from "../../lib/utils";

interface DimondLineProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DimondLine = React.forwardRef<HTMLDivElement, DimondLineProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center mt-4 mb-4",
          className
        )}
        {...props}
      >
        <div className="w-40 h-[2px] bg-[#065C77]" />
        <div className="absolute mt-[-4px]">
          <div className="w-3 h-3 rotate-45 bg-[#065C77]" />
        </div>
      </div>
    );
  }
);

DimondLine.displayName = "DimondLine";

export default DimondLine;