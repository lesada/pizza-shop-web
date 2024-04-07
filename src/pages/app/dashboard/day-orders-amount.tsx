import { useQuery } from "@tanstack/react-query";
import { UtensilsCrossed } from "lucide-react";

import { getDayOrdersAmount } from "@/api/get-day-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DayOrdersAmount() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ["day-orders-amount", "metrics"],
    queryFn: getDayOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Orders (day)</CardTitle>
        <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2">
        {dayOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount.toLocaleString("en-US")}
            </span>
            <p className="text-xs text-muted-foreground">
              {dayOrdersAmount.diffFromYesterday <= 0 ? (
                <span className="text-rose-500 dark:text-rose-400">
                  {dayOrdersAmount.diffFromYesterday}%{" "}
                </span>
              ) : (
                <span className="text-green-500 dark:text-green-400">
                  + {dayOrdersAmount.diffFromYesterday}%{" "}
                </span>
              )}
              from yesterday
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default DayOrdersAmount;
