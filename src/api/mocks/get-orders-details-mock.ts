import { http, HttpResponse } from "msw";

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from "../get-order-details";

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>("/orders/:orderId", ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      email: "john.doe@example.com",
      name: "John Doe",
      phone: "1234567890",
    },
    createdAt: new Date().toISOString(),
    status: "pending",
    totalInCents: 40000,
    orderItems: [
      {
        id: "order-item-1",
        priceInCents: 20000,
        quantity: 2,
        product: {
          name: "order-item",
        },
      },
    ],
  });
});
