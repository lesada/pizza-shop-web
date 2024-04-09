import { api } from "@/lib/axios";

export type GetProfileResponse = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: "manager" | "customer";
  createdAt: string | null;
  updatedAt: string | null;
};

export async function getProfile() {
  const response = await api.get<GetProfileResponse>("/me");
  return response.data;
}
