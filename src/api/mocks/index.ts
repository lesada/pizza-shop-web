import { setupWorker } from "msw/browser";

import { env } from "@/env";

import { approveOrderMock } from "./approve-order-mock";
import { cancelOrderMock } from "./cancel-order-mock";
import { deliverOrderMock } from "./deliver-order-mock";
import { dispatchOrderMock } from "./dispatch-order-mock";
import { getDailyRevenueInPeriodMock } from "./get-daily-revenue-mock";
import { getDayOrdersAmountMock } from "./get-day-orders-amount-mock";
import { getManagedRestaurantsMock } from "./get-managed-restaurant-mock";
import { getMonthCanceledOrdersAmountMock } from "./get-month-canceled-orders-amount-mock";
import { getMonthOrdersAmountMock } from "./get-month-orders-amount-mock";
import { getMonthRevenueMock } from "./get-month-revenue-mock";
import { getOrderDetailsMock } from "./get-orders-details-mock";
import { getOrdersMock } from "./get-orders-mock";
import { getPopularProductsMock } from "./get-popular-products-mock";
import { getProfileMock } from "./get-profile-mock";
import { signInMock } from "./signin-mock";
import { signUpMock } from "./signup-mock";
import { updateProfileMock } from "./update-profile";

export const worker = setupWorker(
  signInMock,
  signUpMock,
  getDayOrdersAmountMock,
  getMonthRevenueMock,
  getDayOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getPopularProductsMock,
  getDailyRevenueInPeriodMock,
  getMonthOrdersAmountMock,
  getManagedRestaurantsMock,
  getProfileMock,
  updateProfileMock,
  getOrdersMock,
  getOrderDetailsMock,
  approveOrderMock,
  cancelOrderMock,
  dispatchOrderMock,
  deliverOrderMock
);

export async function enableMSW() {
  if (env.MODE !== "test") return;
  await worker.start();
}
