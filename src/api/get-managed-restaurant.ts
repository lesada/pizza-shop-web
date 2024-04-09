import { api } from "@/lib/axios";

export type GetManagedRestaurantResponse = {
  id: string;
  email: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string | null;
};

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>(
    "/managed-restaurant"
  );
  return response.data;
}
