import { formatDistanceToNow } from "date-fns";
import { ArrowRight, X } from "lucide-react";

import { TOrder } from "@/api/get-orders";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatters";

import OrderDetails from "./order-details";
import Status from "./status";

function TableItem({ order }: { order: TOrder }) {
  return (
    <TableRow>
      <TableCell>
        <OrderDetails />
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, { addSuffix: true })}
      </TableCell>
      <TableCell className="text-muted-foreground">
        <div className="flex items-center gap-2">
          <Status status={order.status} />
        </div>
      </TableCell>
      <TableCell>{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {formatCurrency(order.total)}
      </TableCell>
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
