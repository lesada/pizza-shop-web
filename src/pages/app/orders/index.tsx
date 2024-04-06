import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { getOrders } from "@/api/get-orders";
import Pagination from "@/components/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Filters from "./filters";
import TableItem from "./table-item";

function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result } = useQuery({
    queryKey: ["orders", pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex: Number(pageIndex),
        customerName,
        orderId,
        status,
      }),
  });

  function handlePageChange(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set("page", String(pageIndex + 1));
      return prev;
    });
  }

  return (
    <>
      <Helmet title="Orders" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>

      <Filters />

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
            {result?.orders.map((order) => (
              <TableItem key={order.orderId} order={order} />
            ))}
          </TableBody>
        </Table>
      </div>

      {result?.orders.length && (
        <Pagination
          pageIndex={result.meta.pageIndex}
          totalCount={result.meta.totalCount}
          perPage={result.meta.perPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default Orders;
