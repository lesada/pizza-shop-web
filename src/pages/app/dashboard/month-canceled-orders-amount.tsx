import { CircleAlert } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function MonthCancelledOrdersAmount() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">
          Cancelled Orders (month)
        </CardTitle>
        <CircleAlert className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2">
        <span className="text-2xl font-bold tracking-tight">3</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">-8%</span>{" "}
          from last month
        </p>
      </CardContent>
    </Card>
  );
}

export default MonthCancelledOrdersAmount;
