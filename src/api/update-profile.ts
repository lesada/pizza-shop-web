import { api } from "@/lib/axios";

type UpdateProfileBody = {
  name: string;
  description: string | null;
};

export async function updateProfile(body: UpdateProfileBody) {
  const response = await api.put("/profile", body);
  return response.data;
}
