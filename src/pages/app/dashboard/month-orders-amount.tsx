import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

import { getMonthOrdersAmount } from "@/api/get-month-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function MonthOrdersAmount() {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ["month-orders-amount", "metrics"],
    queryFn: getMonthOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">
          Orders (month)
        </CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2">
        {monthOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount.amount.toLocaleString("en-US")}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthOrdersAmount.diffFromLastMonth <= 0 ? (
                <span className="text-rose-500 dark:text-rose-400">
                  {monthOrdersAmount.diffFromLastMonth}%{" "}
                </span>
              ) : (
                <span className="text-green-500 dark:text-green-400">
                  + {monthOrdersAmount.diffFromLastMonth}%{" "}
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

export default MonthOrdersAmount;
