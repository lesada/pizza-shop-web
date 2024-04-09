import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

function OrderTableSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => (
    <TableRow key={index} className="animate-pulse">
      <TableCell>
        <Button disabled variant="outline" size="xs">
          <Search className="h-3 w-3" />
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        <Skeleton className="w-12 h-4" />
      </TableCell>
      <TableCell className="text-muted-foreground">
        <Skeleton className="w-28 h-4" />
      </TableCell>
      <TableCell className="text-muted-foreground">
        <Skeleton className="w-20 h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-48 h-4" />
      </TableCell>
      <TableCell className="font-medium">
        <Skeleton className="w-16 h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-20 h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-20 h-4" />
      </TableCell>
    </TableRow>
  ));
}

export default OrderTableSkeleton;
