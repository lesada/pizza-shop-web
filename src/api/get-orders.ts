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

type GetOrdersParams = {
  pageIndex?: number;
};

export async function getOrders({ pageIndex = 0 }: GetOrdersParams) {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex,
    },
  });
  return response.data;
}
