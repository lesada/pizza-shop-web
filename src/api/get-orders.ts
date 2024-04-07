import { api } from "@/lib/axios";
import { TStatus } from "@/types/status";

export type TOrder = {
  orderId: string;
  createdAt: Date;
  status: TStatus;
  customerName: string;
  total: number;
};

export type GetOrdersResponse = {
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
