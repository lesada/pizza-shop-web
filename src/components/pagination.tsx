import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "./ui/button";

type PaginationProps = {
  pageIndex: number;
  totalCount: number;
  perPage: number;
};

function Pagination({ pageIndex, totalCount, perPage }: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total pages: {pages}
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <span className="text-sm font-medium">
          Page {pageIndex + 1} of {pages}
        </span>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={pageIndex === 0}
            onClick={() => console.log("First page")}
            className="h-8 w-8 p-0"
          >
            <ChevronsLeft className="w-4 h-4" />
            <span className="sr-only">First page</span>
          </Button>

          <Button
            variant="outline"
            disabled={pageIndex === 0}
            onClick={() => console.log("Previous page")}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          <Button
            variant="outline"
            disabled={pageIndex === pages - 1}
            onClick={() => console.log("Next page")}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Next page</span>
          </Button>

          <Button
            variant="outline"
            disabled={pageIndex === pages - 1}
            onClick={() => console.log("Last page")}
            className="h-8 w-8 p-0"
          >
            <ChevronsRight className="w-4 h-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
