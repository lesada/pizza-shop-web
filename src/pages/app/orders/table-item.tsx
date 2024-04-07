import { useMutation } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, X } from "lucide-react";

import { cancelOrder } from "@/api/cancel-order";
import { GetOrdersResponse, TOrder } from "@/api/get-orders";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { queryClient } from "@/lib/react-query";
import { formatCurrency } from "@/utils/formatters";

import OrderDetails from "./order-details";
import Status from "./status";

function TableItem({ order }: { order: TOrder }) {
  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_, { orderId }) {
      const ordersListCached = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ["orders"],
      });

      ordersListCached?.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) return;

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId === orderId) {
              return {
                ...order,
                status: "canceled",
              };
            }
            return order;
          }),
        });
      });
    },
  });

  return (
    <TableRow>
      <TableCell>
        <OrderDetails orderId={order.orderId} />
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
        {formatCurrency(order.total / 100)}
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Approve
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          disabled={!["pending", "processing"].includes(order.status)}
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default TableItem;
