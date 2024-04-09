import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const filtersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type FiltersSchema = z.infer<typeof filtersSchema>;

function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { register, handleSubmit, control, reset } = useForm<FiltersSchema>({
    defaultValues: {
      orderId: orderId ?? "",
      customerName: customerName ?? "",
      status: status ?? "all",
    },
    resolver: zodResolver(filtersSchema),
  });

  function onSubmit(data: FiltersSchema) {
    setSearchParams((prev) => {
      data.orderId ? prev.set("orderId", data.orderId) : prev.delete("orderId");
      data.customerName
        ? prev.set("customerName", data.customerName)
        : prev.delete("customerName");
      data.status ? prev.set("status", data.status) : prev.delete("status");
      prev.set("pageIndex", "1");
      return prev;
    });
  }

  function clearFilters() {
    setSearchParams((prev) => {
      prev.delete("orderId");
      prev.delete("customerName");
      prev.set("status", "all");
      return prev;
    });

    reset();
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
      <span className="text-sm font-semibold">Filters:</span>
      <Input
        placeholder="Search by order identifier"
        className="w-auto h-8"
        {...register("orderId")}
      />
      <Input
        placeholder="Search by client name"
        className="w-[320px] h-8"
        {...register("customerName")}
      />
      <Controller
        control={control}
        name="status"
        render={({ field: { name, onChange, value } }) => (
          <Select
            defaultValue="all"
            onValueChange={onChange}
            value={value}
            name={name}
          >
            <SelectTrigger className="w-80 h-8" aria-label="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="delivering">Delivering</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" size="xs" variant="secondary">
        <Search className="h-4 w-4 mr-2" />
        Filter Results
      </Button>

      <Button type="button" size="xs" variant="outline" onClick={clearFilters}>
        <X className="h-4 w-4 mr-2" />
        Clear Filters
      </Button>
    </form>
  );
}

export default Filters;
