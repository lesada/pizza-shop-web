import { api } from "@/lib/axios";

export type TOrder = {
  orderId: string;
  createdAt: Date;
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
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
  orderId?: string | null;
  customerName?: string | null;
  status?: string | null;
};

export async function getOrders({
  pageIndex = 0,
  customerName,
  orderId,
  status,
}: GetOrdersParams) {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex,
      customerName,
      orderId,
      status,
    },
  });
  return response.data;
}
