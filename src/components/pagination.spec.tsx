import { render } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

import Pagination from "./pagination";

const onPageChangeCallback = vi.fn();

describe("Order Status", () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear();
  });

  it("should display the right amount of pages and results", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />
    );

    expect(wrapper.getByText("Page 1 of 20")).toBeVisible();
  });

  it("should be possible navigate to the next page", async () => {
    const user = UserEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    );
    const nextPageButton = wrapper.getByRole("button", {
      name: "Next page",
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  });

  it("should be possible navigate to the previous page", async () => {
    const user = UserEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={3}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    );
    const previousPageButton = wrapper.getByRole("button", {
      name: "Previous page",
    });

    await user.click(previousPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(2);
  });

  it("should be possible navigate to the first page", async () => {
    const user = UserEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={3}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    );
    const firstPageButton = wrapper.getByRole("button", {
      name: "First page",
    });

    await user.click(firstPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(0);
  });

  it("should be possible navigate to the last page", async () => {
    const user = UserEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={3}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    );
    const lastPageButton = wrapper.getByRole("button", {
      name: "Last page",
    });

    await user.click(lastPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(19);
  });

  it("should disable the previous button on the first page", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    );

    const previousPageButton = wrapper.getByRole("button", {
      name: "Previous page",
    });

    expect(previousPageButton).toBeDisabled();
  });

  it("should disable the next button on the last page", () => {
    const wrapper = render(
      <Pagination
        pageIndex={19}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    );

    const nextPageButton = wrapper.getByRole("button", {
      name: "Next page",
    });

    expect(nextPageButton).toBeDisabled();
  });
});
