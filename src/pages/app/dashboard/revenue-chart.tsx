import { useQuery } from "@tanstack/react-query";
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

const linesProps = {
  stroke: "#888",
  axisLine: false,
  tickLine: false,
};

function RevenueChart() {
  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ["daily-revenue-in-period", "metrics"],
    queryFn: getDailyRevenueInPeriod,
  });

  return (
    <Card className="col-span-6">
      <CardHeader className="pb-8">
        <CardTitle>Period Revenue</CardTitle>
        <CardDescription>Daily revenue in the period.</CardDescription>
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
