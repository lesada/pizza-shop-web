import { api } from "@/lib/axios";
import { TStatus } from "@/types/status";

export type GetOrderDetailsParams = {
  orderId: string;
};

export type GetOrderDetailsResponse = {
  id: string;
  createdAt: string;
  status: TStatus;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
};

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`);
  return response.data;
}
