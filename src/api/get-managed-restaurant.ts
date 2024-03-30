import { api } from "@/lib/axios";

export type GetManagedRestaurantResponse = {
  id: number;
  email: string;
  name: string;
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>(
    "/managed-restaurant"
  );
  return response.data;
}
