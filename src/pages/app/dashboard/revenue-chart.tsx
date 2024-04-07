import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";
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

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map((item) => ({
      date: item.date,
      receipt: item.receipt / 100,
    }));
  }, [dailyRevenueInPeriod]);

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
        {dailyRevenueInPeriod ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart style={{ fontSize: "12px" }} data={chartData}>
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
        ) : (
          <div className="h-[240px] flex w-full items-center justify-center">
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RevenueChart;
