import { useQuery } from "@tanstack/react-query";
import { CircleAlert } from "lucide-react";

import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function MonthCancelledOrdersAmount() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ["month-canceled-orders-amount", "metrics"],
    queryFn: getMonthCanceledOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">
          Cancelled Orders (month)
        </CardTitle>
        <CircleAlert className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2">
        {monthCanceledOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount.toLocaleString("en-US")}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthCanceledOrdersAmount.diffFromLastMonth >= 0 ? (
                <span className="text-rose-500 dark:text-rose-400">
                  + {monthCanceledOrdersAmount.diffFromLastMonth}%{" "}
                </span>
              ) : (
                <span className="text-green-500 dark:text-green-400">
                  {monthCanceledOrdersAmount.diffFromLastMonth}%{" "}
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

export default MonthCancelledOrdersAmount;
