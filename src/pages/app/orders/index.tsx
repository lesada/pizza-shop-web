import { Helmet } from "react-helmet-async";

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
            {Array.from({ length: 10 }).map((_, i) => (
              <TableItem key={i} />
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination pageIndex={0} totalCount={100} perPage={10} />
    </>
  );
}

export default Orders;
