import { filterOptions } from "@/config";
import { Fragment, useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

function ProductFilter({ filters, handleFilter }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-background rounded-lg shadow-sm border">
      <div 
        className="p-4 border-b cursor-pointer hover:bg-accent/50 transition-colors duration-200"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-amber-700" />
            <h2 className="text-lg font-extrabold text-amber-800">Filters</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">
              {isCollapsed ? 'Show' : 'Hide'}
            </span>
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4 text-amber-700" />
            ) : (
              <ChevronUp className="h-4 w-4 text-amber-700" />
            )}
          </div>
        </div>
      </div>
      
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isCollapsed ? 'max-h-0' : 'max-h-[800px]'
      }`}>
        <div className="p-4 space-y-4">
          {Object.keys(filterOptions).map((keyItem, index) => (
            <Fragment key={keyItem}>
              <div>
                <h3 className="text-base font-bold text-amber-800 mb-3">{keyItem}</h3>
                <div className="grid gap-2">
                  {filterOptions[keyItem].map((option) => (
                    <Label 
                      key={option.id}
                      className="flex font-medium items-center gap-2 cursor-pointer hover:text-amber-700 transition-colors duration-200"
                    >
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[keyItem] &&
                          filters[keyItem].indexOf(option.id) > -1
                        }
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                        className="border-amber-300 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
              {index < Object.keys(filterOptions).length - 1 && <Separator />}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
