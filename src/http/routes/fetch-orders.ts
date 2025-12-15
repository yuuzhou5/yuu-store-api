import { Elysia } from "elysia";
import { findAllOrders } from "../../database/queries";

export const fetchOrders = new Elysia().get("/orders", async () => {
  const orders = await findAllOrders();

  return {
    orders,
  };
});
