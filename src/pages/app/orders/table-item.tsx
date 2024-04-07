import { useMutation } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, X } from "lucide-react";

import { approveOrder } from "@/api/approve-order";
import { cancelOrder } from "@/api/cancel-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";
import { GetOrdersResponse, TOrder } from "@/api/get-orders";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { queryClient } from "@/lib/react-query";
import { TStatus } from "@/types/status";
import { formatCurrency } from "@/utils/formatters";

import OrderDetails from "./order-details";
import Status from "./status";

function TableItem({ order }: { order: TOrder }) {
  function updateOrderStatusOnCache(orderId: string, newStatus: TStatus) {
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
              status: newStatus,
            };
          }
          return order;
        }),
      });
    });
  }

  const { mutateAsync: cancelOrderFn, isPending: isCanceling } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, "canceled");
    },
  });

  const { mutateAsync: approveOrderFn, isPending: isApproving } = useMutation({
    mutationFn: approveOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, "processing");
    },
  });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatching } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivering");
      },
    });

  const { mutateAsync: deliverOrderFn, isPending: isDelivering } = useMutation({
    mutationFn: deliverOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, "delivered");
    },
  });

  const nextStatus = {
    pending: "Approve",
    processing: "Dispatch",
    delivering: "Deliver",
    canceled: "Canceled",
    delivered: "Delivered",
  };

  const handleNextStatus = {
    pending: approveOrderFn,
    processing: dispatchOrderFn,
    delivering: deliverOrderFn,
    canceled: () => {},
    delivered: () => {},
  };

  const handleDisableNextStatus = {
    pending: isApproving,
    processing: isDispatching,
    delivering: isDelivering,
    canceled: true,
    delivered: true,
  };

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
        <Button
          variant="outline"
          size="xs"
          onClick={() =>
            handleNextStatus[order.status]({ orderId: order.orderId })
          }
          disabled={handleDisableNextStatus[order.status]}
        >
          <ArrowRight className="mr-2 h-3 w-3" />
          {nextStatus[order.status]}
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
