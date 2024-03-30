import { Helmet } from "react-helmet-async";

import DayOrdersAmount from "./day-orders-amount";
import MonthCancelledOrdersAmount from "./month-canceled-orders-amount";
import MonthOrdersAmount from "./month-orders-amount";
import MonthRevenue from "./month-revenue";
import PopularProducts from "./popular-products";
import RevenueChart from "./revenue-chart";

function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenue />
          <MonthOrdersAmount />
          <DayOrdersAmount />
          <MonthCancelledOrdersAmount />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProducts />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
