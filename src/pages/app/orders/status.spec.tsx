import { render } from "@testing-library/react";

import Status from "./status";

describe("Order Status", () => {
  it("should display the right text and class based on the order status", () => {
    // Pending
    const wrapper = render(<Status status="pending" />);

    const statusText = wrapper.getByText("Pending");
    const badge = wrapper.getByTestId("badge");

    expect(statusText).toBeVisible();
    expect(badge).toHaveClass("bg-slate-400");

    // Canceled
    wrapper.rerender(<Status status="canceled" />);
    const canceledStatusText = wrapper.getByText("Canceled");
    const canceledBadge = wrapper.getByTestId("badge");

    expect(canceledStatusText).toBeVisible();
    expect(canceledBadge).toHaveClass("bg-rose-500");

    // Processing
    wrapper.rerender(<Status status="processing" />);
    const processingStatusText = wrapper.getByText("Processing");
    const processingBadge = wrapper.getByTestId("badge");

    expect(processingStatusText).toBeVisible();
    expect(processingBadge).toHaveClass("bg-yellow-500");

    // Delivering
    wrapper.rerender(<Status status="delivering" />);
    const deliveringStatusText = wrapper.getByText("Delivering");
    const deliveringBadge = wrapper.getByTestId("badge");

    expect(deliveringStatusText).toBeVisible();
    expect(deliveringBadge).toHaveClass("bg-amber-500");

    // Delivered
    wrapper.rerender(<Status status="delivered" />);
    const deliveredStatusText = wrapper.getByText("Delivered");
    const deliveredBadge = wrapper.getByTestId("badge");

    expect(deliveredStatusText).toBeVisible();
    expect(deliveredBadge).toHaveClass("bg-emerald-500");
  });
});
