import { parser } from "@yuubot45/ggmax-sales-parser";
import { Elysia } from "elysia";
import { z } from "zod";

export const addSales = new Elysia().post(
  "/sales",
  ({ body }) => {
    const { text, gameCategoryKeywordsMap } = body;

    const orders = parser(text, { gameCategoryKeywordsMap });

    return orders;
  },
  {
    body: z.object({
      text: z.string(),
      gameCategoryKeywordsMap: z
        .record(z.string(), z.array(z.string()))
        .optional()
        .default({}),
    }),
  }
);
