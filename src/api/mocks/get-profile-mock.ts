import { http, HttpResponse } from "msw";

import { GetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      id: "1",
      createdAt: "2021-09-01T00:00:00.000Z",
      email: "john.doe@example.com",
      name: "John Doe",
      phone: "1234567890",
      role: "manager",
      updatedAt: null,
    });
  }
);
