import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import colors from "tailwindcss/colors";

import { getPopularProducts } from "@/api/get-popular-products";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    if (!popularProducts) return null;

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
        {popularProducts[index].product.length > 10
          ? popularProducts[index].product.substring(0, 10).concat("...")
          : popularProducts[index].product}{" "}
        ({value})
      </text>
    );
  };

  const { data: popularProducts } = useQuery({
    queryKey: ["popular-products", "metrics"],
    queryFn: getPopularProducts,
  });

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <CardTitle>Popular Products</CardTitle>
        <CardDescription>
          The most popular products in the period.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {popularProducts ? (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: "12px" }} className="px-4">
              <Pie
                data={popularProducts}
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
                {popularProducts.map((entry, i) => (
                  <Cell
                    key={entry.product}
                    fill={COLORS[i]}
                    className="stroke-card hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
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

export default PopularProducts;
