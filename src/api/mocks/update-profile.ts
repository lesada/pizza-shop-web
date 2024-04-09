import { http, HttpResponse } from "msw";

import { UpdateProfileBody } from "../update-profile";

export const updateProfileMock = http.get<never, UpdateProfileBody>(
  "/profile",
  async ({ request }) => {
    const { name } = await request.json();

    if (name === "Pizza") return new HttpResponse(null, { status: 204 });

    return HttpResponse.json(null, { status: 400 });
  }
);
