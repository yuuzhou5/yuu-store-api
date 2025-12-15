import { Elysia } from "elysia";
import { addSales } from "./http/routes/add-sales";
import { fetchOrders } from "./http/routes/fetch-orders";
import { syncInventoryBatches } from "./http/routes/sync-inventory-batches";

const app = new Elysia()
	.get("/", () => "Hello Elysia")
	.use(addSales)
	.use(fetchOrders)
	.use(syncInventoryBatches);

export type App = typeof app;

export default app;
