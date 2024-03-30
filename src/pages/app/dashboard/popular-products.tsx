import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import colors from "tailwindcss/colors";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  {
    product: "Pizza Margherita",
    amount: 40,
  },
  {
    product: "Pizza Pepperoni",
    amount: 30,
  },
  {
    product: "Pizza Quattro Stagioni",
    amount: 20,
  },
  {
    product: "Pizza Capricciosa",
    amount: 27,
  },
  {
    product: "Pizza Marinara",
    amount: 18,
  },
];

const COLORS = [
  colors.blue[500],
  colors.green[500],
  colors.red[500],
  colors.purple[500],
  colors.pink[500],
];

function PopularProducts() {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = 10 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        className="fill-muted-foreground text-xs"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {data[index].product.length > 10
          ? data[index].product.substring(0, 10).concat("...")
          : data[index].product}{" "}
        ({value})
      </text>
    );
  };

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <CardTitle>Popular Products</CardTitle>
        <CardDescription>
          The most popular products in the period.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: "12px" }} className="px-4">
            <Pie
              data={data}
              dataKey="amount"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, i) => (
                <Cell
                  key={entry.product}
                  fill={COLORS[i]}
                  className="stroke-card hover:opacity-80"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default PopularProducts;
