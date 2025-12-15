CREATE TYPE "public"."order_status" AS ENUM('refunded', 'delivered');--> statement-breakpoint
CREATE TABLE "inventory_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exchange_rate" numeric(10, 4) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"content" json NOT NULL,
	"message_id" varchar(255) NOT NULL,
	CONSTRAINT "inventory_batches_message_id_unique" UNIQUE("message_id")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer" varchar(255) NOT NULL,
	"order_id" varchar(12) NOT NULL,
	"status" "order_status",
	"banner_title" varchar(255),
	"product_name" varchar(255) NOT NULL,
	"category" varchar(255),
	"plan" varchar(255) NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" numeric(10, 2) NOT NULL,
	"subtotal" numeric(10, 2) NOT NULL,
	"total" numeric(10, 2) NOT NULL,
	"external_id" varchar(255),
	"created_at" timestamp NOT NULL,
	CONSTRAINT "orders_order_id_unique" UNIQUE("order_id")
);
