import { db } from "./";

// biome-ignore lint/performance/noNamespaceImport: we need to use the schema directly
import * as schema from "./schema";

export async function findAllOrders() {
  const orders = await db.select().from(schema.orders);

  return orders;
}
