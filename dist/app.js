// src/app.ts
import { Elysia as Elysia4 } from "elysia";

// src/http/routes/add-sales.ts
import { parser } from "@yuubot45/ggmax-sales-parser";
import { Elysia } from "elysia";
import { z } from "zod";
var addSales = new Elysia().post(
  "/sales",
  ({ body }) => {
    const { text, gameCategoryKeywordsMap } = body;
    const orders2 = parser(text, { gameCategoryKeywordsMap });
    return orders2;
  },
  {
    body: z.object({
      text: z.string(),
      gameCategoryKeywordsMap: z.record(z.string(), z.array(z.string())).optional().default({})
    })
  }
);

// src/http/routes/fetch-orders.ts
import { Elysia as Elysia2 } from "elysia";

// src/database/index.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// src/env.ts
import { z as z2 } from "zod";
var envSchema = z2.object({
  DATABASE_URL: z2.url(),
  PORT: z2.coerce.number().default(3333)
});
var env = envSchema.parse(process.env);

// src/database/schema.ts
import {
  integer,
  json,
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
var orderStatus = pgEnum("order_status", ["refunded", "delivered"]);
var orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  // Nome do cliente
  customer: varchar("customer", { length: 255 }).notNull(),
  // ID do pedido - # + 6 ~ 10 caracteres
  orderId: varchar("order_id", { length: 12 }).notNull().unique(),
  // Status no momento de cadastrar o produto. "refunded", "delivered"
  status: orderStatus(),
  // Título do banner do produto
  bannerTitle: varchar("banner_title", { length: 255 }),
  // Nome do produto
  productName: varchar("product_name", { length: 255 }).notNull(),
  // Categoria do produto (Genshin, Star Rail, etc.)
  category: varchar("category", { length: 255 }),
  // Plano de venda do anúncio na ggmax (Diamante, Gold, etc.)
  plan: varchar("plan", { length: 255 }).notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull().$type(),
  // Subtotal do pedido
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull().$type(),
  // Valor total do pedido descontando a comissão da GGMAX
  total: numeric("total", { precision: 10, scale: 2 }).notNull().$type(),
  // ID externo do pedido (e-mail do produto enviado)
  externalId: varchar("external_id", { length: 255 }),
  // userId: text("user_id").references(() => users.id),
  // Data de criação do pedido
  createdAt: timestamp("created_at").notNull()
});
var inventoryBatches = pgTable("inventory_batches", {
  id: uuid("id").primaryKey().defaultRandom(),
  exchangeRate: numeric("exchange_rate", { precision: 10, scale: 4 }).notNull().$type(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull().$type(),
  content: json("content").notNull().$type(),
  messageId: varchar("message_id", { length: 255 }).notNull().unique()
});

// src/database/index.ts
var sql = neon(env.DATABASE_URL);
var db = drizzle({ client: sql });

// src/database/queries.ts
async function findAllOrders() {
  const orders2 = await db.select().from(orders);
  return orders2;
}

// src/http/routes/fetch-orders.ts
var fetchOrders = new Elysia2().get("/orders", async () => {
  const orders2 = await findAllOrders();
  return {
    orders: orders2
  };
});

// src/http/routes/sync-inventory-batches.ts
import { Elysia as Elysia3 } from "elysia";
var syncInventoryBatches = new Elysia3().get(
  "/sync-inventory-batches",
  () => "Hello World"
);

// src/app.ts
var app = new Elysia4().get("/", () => "Hello Elysia").use(addSales).use(fetchOrders).use(syncInventoryBatches);
var app_default = app;
export {
  app_default as default
};
