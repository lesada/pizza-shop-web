import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { date: "10/12", revenue: 4000 },
  { date: "10/13", revenue: 3000 },
  { date: "10/14", revenue: 2000 },
  { date: "10/15", revenue: 2780 },
  { date: "10/16", revenue: 1890 },
  { date: "10/17", revenue: 2390 },
  { date: "10/18", revenue: 3490 },
];

const linesProps = {
  stroke: "#888",
  axisLine: false,
  tickLine: false,
};

function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="pb-8">
        <CardTitle>Period Revenue</CardTitle>
        <CardDescription>Daily revenue in the period.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart style={{ fontSize: "12px" }} data={data}>
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
              dataKey="revenue"
              stroke={colors.rose[500]}
            />

            <CartesianGrid vertical={false} className="stroke-muted" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default RevenueChart;
