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
          "relative flex items-center justify-center my-4",
          className
        )}
        {...props}
      >
        {/* Line */}
        <div className="w-40 h-[2px] bg-orange-500" />

        {/* Diamond */}
        <div className="absolute flex items-center justify-center">
          <div className="w-3 h-3 rotate-45 bg-orange-500" />
        </div>
      </div>
    );
  }
);

DimondLine.displayName = "DimondLine";

export default DimondLine;