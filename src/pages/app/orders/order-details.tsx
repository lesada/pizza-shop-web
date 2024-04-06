import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Search } from "lucide-react";

import { getOrderDetails } from "@/api/get-order-details";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatters";

import Status from "./status";

function OrderDetails({ orderId }: { orderId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: details } = useQuery({
    queryKey: ["order-details", { orderId }],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: isOpen,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="xs" onClick={() => setIsOpen(true)}>
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle> Order Details</DialogTitle>
          <DialogDescription> Order: {orderId}</DialogDescription>
        </DialogHeader>

        {details && (
          <div className="space-y-4">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Status
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <div className="flex items-center gap-2">
                      <Status status={details.status} />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Client
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {details.customer.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">Phone</TableCell>
                  <TableCell className="flex justify-end">
                    {details.customer.phone ?? "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">Email</TableCell>
                  <TableCell className="flex justify-end">
                    {details.customer.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Placed on
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {formatDistanceToNow(new Date(details.createdAt), {
                      addSuffix: true,
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {details.orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.priceInCents / 100)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(
                        (item.priceInCents / 100) * item.quantity
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(details.totalInCents / 100)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default OrderDetails;
