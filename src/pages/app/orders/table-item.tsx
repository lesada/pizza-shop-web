import { ArrowRight, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

function TableItem() {
  return (
    <TableRow>
      <TableCell>
        <Button variant="outline" size="xs">
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">ORD-0001</TableCell>
      <TableCell className="text-muted-foreground">two minutes ago</TableCell>
      <TableCell className="text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-success rounded-full bg-slate-400" />
          <span>Pending</span>
        </div>
      </TableCell>
      <TableCell>John Doe</TableCell>
      <TableCell className="font-medium">$ 120.00</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Approve
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="mr-2 h-3 w-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default TableItem;
