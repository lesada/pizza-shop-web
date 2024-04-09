import { http, HttpResponse } from "msw";

import { GetManagedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantsMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>("/managed-restaurant", () => {
  return HttpResponse.json({
    createdAt: "2021-09-01T00:00:00.000Z",
    id: "1",
    name: "Restaurant 1",
    description: "Description 1",
    email: "john.doe@example.com",
    updatedAt: "2021-09-11T00:00:00.000Z",
  });
});
