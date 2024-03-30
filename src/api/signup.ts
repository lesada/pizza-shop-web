import { api } from "@/lib/axios";

export type SignUpBody = {
  restaurantName: string;
  managerName: string;
  phone: string;
  email: string;
};
export async function signup(body: SignUpBody) {
  await api.post("/restaurants", body);
}
