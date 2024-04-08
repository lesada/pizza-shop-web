import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import { queryClient } from "@/lib/react-query";

import SignIn from "./signin";

describe("Sign In", () => {
  it("should set default email input value if email is present on search params", () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => (
        <HelmetProvider>
          <MemoryRouter
            initialEntries={["/auth/signin?email=john.doe@someemail.com"]}
          >
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        </HelmetProvider>
      ),
    });

    expect(wrapper.getByLabelText("Email address")).toHaveValue(
      "john.doe@someemail.com"
    );
  });
});
