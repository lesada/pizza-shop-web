import { api } from "@/lib/axios";

export type UpdateProfileBody = {
  name: string;
  description: string | null;
};

export async function updateProfile(body: UpdateProfileBody) {
  await api.put("/profile", body);
}
