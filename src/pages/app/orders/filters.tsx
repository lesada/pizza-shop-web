import { SelectValue } from "@radix-ui/react-select";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

function Filters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filters:</span>
      <Input placeholder="Search by order identifier" className="w-auto h-8" />
      <Input placeholder="Search by client name" className="w-[320px] h-8" />
      <Select defaultValue="all">
        <SelectTrigger className="w-80 h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="canceled">Canceled</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" size="xs" variant="secondary">
        <Search className="h-4 w-4 mr-2" />
        Filter Results
      </Button>

      <Button type="button" size="xs" variant="outline">
        <X className="h-4 w-4 mr-2" />
        Clear Filters
      </Button>
    </form>
  );
}

export default Filters;
