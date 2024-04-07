import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";

function MonthRevenue() {
  const { data: monthRevenue } = useQuery({
    queryKey: ["month-revenue", "metrics"],
    queryFn: getMonthRevenue,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">
          Revenue (month)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2">
        {monthRevenue && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {formatCurrency(monthRevenue.receipt / 100)}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthRevenue.diffFromLastMonth <= 0 ? (
                <span className="text-rose-500 dark:text-rose-400">
                  {monthRevenue.diffFromLastMonth}%{" "}
                </span>
              ) : (
                <span className="text-green-500 dark:text-green-400">
                  + {monthRevenue.diffFromLastMonth}%{" "}
                </span>
              )}
              from last month
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default MonthRevenue;
