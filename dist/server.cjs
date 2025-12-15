"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/server.ts
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);

// src/app.ts
var import_elysia4 = require("elysia");

// src/http/routes/add-sales.ts
var import_ggmax_sales_parser = require("@yuubot45/ggmax-sales-parser");
var import_elysia = require("elysia");
var import_zod = require("zod");
var addSales = new import_elysia.Elysia().post(
  "/sales",
  ({ body }) => {
    const { text, gameCategoryKeywordsMap } = body;
    const orders2 = (0, import_ggmax_sales_parser.parser)(text, { gameCategoryKeywordsMap });
    return orders2;
  },
  {
    body: import_zod.z.object({
      text: import_zod.z.string(),
      gameCategoryKeywordsMap: import_zod.z.record(import_zod.z.string(), import_zod.z.array(import_zod.z.string())).optional().default({})
    })
  }
);

// src/http/routes/fetch-orders.ts
var import_elysia2 = require("elysia");

// src/database/index.ts
var import_serverless = require("@neondatabase/serverless");
var import_neon_http = require("drizzle-orm/neon-http");

// src/env.ts
var import_zod2 = require("zod");
var envSchema = import_zod2.z.object({
  DATABASE_URL: import_zod2.z.url(),
  PORT: import_zod2.z.coerce.number().default(3333)
});
var env = envSchema.parse(process.env);

// src/database/schema.ts
var import_pg_core = require("drizzle-orm/pg-core");
var orderStatus = (0, import_pg_core.pgEnum)("order_status", ["refunded", "delivered"]);
var orders = (0, import_pg_core.pgTable)("orders", {
  id: (0, import_pg_core.uuid)("id").primaryKey().defaultRandom(),
  // Nome do cliente
  customer: (0, import_pg_core.varchar)("customer", { length: 255 }).notNull(),
  // ID do pedido - # + 6 ~ 10 caracteres
  orderId: (0, import_pg_core.varchar)("order_id", { length: 12 }).notNull().unique(),
  // Status no momento de cadastrar o produto. "refunded", "delivered"
  status: orderStatus(),
  // Título do banner do produto
  bannerTitle: (0, import_pg_core.varchar)("banner_title", { length: 255 }),
  // Nome do produto
  productName: (0, import_pg_core.varchar)("product_name", { length: 255 }).notNull(),
  // Categoria do produto (Genshin, Star Rail, etc.)
  category: (0, import_pg_core.varchar)("category", { length: 255 }),
  // Plano de venda do anúncio na ggmax (Diamante, Gold, etc.)
  plan: (0, import_pg_core.varchar)("plan", { length: 255 }).notNull(),
  quantity: (0, import_pg_core.integer)("quantity").notNull(),
  unitPrice: (0, import_pg_core.numeric)("unit_price", { precision: 10, scale: 2 }).notNull().$type(),
  // Subtotal do pedido
  subtotal: (0, import_pg_core.numeric)("subtotal", { precision: 10, scale: 2 }).notNull().$type(),
  // Valor total do pedido descontando a comissão da GGMAX
  total: (0, import_pg_core.numeric)("total", { precision: 10, scale: 2 }).notNull().$type(),
  // ID externo do pedido (e-mail do produto enviado)
  externalId: (0, import_pg_core.varchar)("external_id", { length: 255 }),
  // userId: text("user_id").references(() => users.id),
  // Data de criação do pedido
  createdAt: (0, import_pg_core.timestamp)("created_at").notNull()
});
var inventoryBatches = (0, import_pg_core.pgTable)("inventory_batches", {
  id: (0, import_pg_core.uuid)("id").primaryKey().defaultRandom(),
  exchangeRate: (0, import_pg_core.numeric)("exchange_rate", { precision: 10, scale: 4 }).notNull().$type(),
  price: (0, import_pg_core.numeric)("price", { precision: 10, scale: 2 }).notNull().$type(),
  content: (0, import_pg_core.json)("content").notNull().$type(),
  messageId: (0, import_pg_core.varchar)("message_id", { length: 255 }).notNull().unique()
});

// src/database/index.ts
var sql = (0, import_serverless.neon)(env.DATABASE_URL);
var db = (0, import_neon_http.drizzle)({ client: sql });

// src/database/queries.ts
async function findAllOrders() {
  const orders2 = await db.select().from(orders);
  return orders2;
}

// src/http/routes/fetch-orders.ts
var fetchOrders = new import_elysia2.Elysia().get("/orders", async () => {
  const orders2 = await findAllOrders();
  return {
    orders: orders2
  };
});

// src/http/routes/sync-inventory-batches.ts
var import_elysia3 = require("elysia");
var syncInventoryBatches = new import_elysia3.Elysia().get(
  "/sync-inventory-batches",
  () => "Hello World"
);

// src/app.ts
var app = new import_elysia4.Elysia().get("/", () => "Hello Elysia").use(addSales).use(fetchOrders).use(syncInventoryBatches);

// src/server.ts
var server = app;
var server_default = server;
