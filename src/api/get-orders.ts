import { api } from "@/lib/axios";

export type TOrder = {
  orderId: string;
  createdAt: Date;
  status:
    | "pending"
    | "completed"
    | "canceled"
    | "processing"
    | "delivering"
    | "delivered";
  customerName: string;
  total: number;
};

type GetOrdersResponse = {
  orders: TOrder[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
};

export async function getOrders() {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex: 0,
    },
  });
  return response.data;
}
