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
        <Skeleton className="w-[172px] h-4" />
      </TableCell>
      <TableCell className="text-muted-foreground">
        <Skeleton className="w-[148px] h-4" />
      </TableCell>
      <TableCell className="text-muted-foreground">
        <Skeleton className="w-[110px] h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[200px] h-4" />
      </TableCell>
      <TableCell className="font-medium">
        <Skeleton className="w-[64px] h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[92px] h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[92px] h-4" />
      </TableCell>
    </TableRow>
  ));
}

export default OrderTableSkeleton;
