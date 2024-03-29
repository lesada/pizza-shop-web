import { ArrowRight, Search, X } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Orders() {
  return (
    <>
      <Helmet title="Orders" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>
      <form className="flex items-center gap-2">
        <span className="text-sm font-semibold">Filters:</span>
        <Input placeholder="Search by client name" className="h-8 w-[320px]" />
      </form>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16" />
              <TableHead className="w-28">Identifier</TableHead>
              <TableHead className="w-40">Placed on</TableHead>
              <TableHead className="w-36">Status</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="w-30">Total</TableHead>
              <TableHead className="w-24"></TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Button variant="outline" size="xs">
                  <Search className="h-3 w-3" />
                  <span className="sr-only">Detalhes do pedido</span>
                </Button>
              </TableCell>
              <TableCell className="font-mono text-xs font-medium">
                ORD-0001
              </TableCell>
              <TableCell className="text-muted-foreground">
                two minutes ago
              </TableCell>
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
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Orders;
