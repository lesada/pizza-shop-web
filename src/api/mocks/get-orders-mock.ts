import { HttpResponse, http } from "msw";

import { TStatus } from "@/types/status";

import { GetOrdersResponse } from "../get-orders";

const statuses: TStatus[] = [
  "pending",
  "canceled",
  "processing",
  "delivering",
  "delivered",
];

const orders: GetOrdersResponse["orders"] = Array.from({ length: 60 }).map(
  (_, index) => ({
    orderId: `order-${index + 1}`,
    customerName: `Customer ${index + 1}`,
    total: 100,
    createdAt: new Date(),
    status: statuses[index % 5],
  })
);

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  "/orders",
  async ({ request }) => {
    const { searchParams } = new URL(request.url);

    const pageIndex = searchParams.get("pageIndex")
      ? Number(searchParams.get("pageIndex"))
      : 0;
    const customerName = searchParams.get("customerName");
    const orderId = searchParams.get("orderId");
    const status = searchParams.get("status");

    let filteredOrders = orders;

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName)
      );
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId)
      );
    }

    if (status) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === status
      );
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10
    );

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    });
  }
);
