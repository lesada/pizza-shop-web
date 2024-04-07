import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";

import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";

const linesProps = {
  stroke: "#888",
  axisLine: false,
  tickLine: false,
};

function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ["daily-revenue-in-period", "metrics", dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  });

  return (
    <Card className="col-span-6">
      <CardHeader className="pb-8">
        <CardTitle>Period Revenue</CardTitle>
        <CardDescription>Daily revenue in the period.</CardDescription>

        <div className="flex items-center gap-3">
          <Label>Period</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>

      <CardContent>
        {dailyRevenueInPeriod && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart style={{ fontSize: "12px" }} data={dailyRevenueInPeriod}>
              <XAxis dataKey="date" {...linesProps} dy={16} />
              <YAxis
                {...linesProps}
                tickFormatter={(value: number) =>
                  value.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                }
              />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.blue[500]}
              />

              <CartesianGrid vertical={false} className="stroke-muted" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default RevenueChart;
