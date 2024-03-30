import { api } from "@/lib/axios";

type GetManagedRestaurantResponse = {
  id: number;
  email: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>(
    "/managed-restaurant"
  );
  return response.data;
}
