import { Elysia } from "elysia";

export const syncInventoryBatches = new Elysia().get(
  "/sync-inventory-batches",
  () => "Hello World"
);
