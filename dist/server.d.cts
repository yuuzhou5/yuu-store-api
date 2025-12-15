import * as elysia from 'elysia';

declare const server: elysia.default<"", {
    decorator: {};
    store: {};
    derive: {};
    resolve: {};
}, {
    typebox: {};
    error: {};
}, {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
    response: {};
}, {
    get: {
        body: unknown;
        params: {};
        query: unknown;
        headers: unknown;
        response: {
            200: string;
        };
    };
} & {
    sales: {
        post: {
            body: {
                text: string;
                gameCategoryKeywordsMap: Record<string, string[]>;
            };
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    orderId: string;
                    customer: string | null;
                    status: "refunded" | "delivered";
                    bannerTitle: string | null;
                    productName: string | null;
                    category: string | null;
                    plan: "Diamante + Entrega Automatica" | "Diamante" | "Prata" | "empty" | "Ouro";
                    quantity: number;
                    unitPrice: number | null;
                    subtotal: number;
                    total: number;
                    externalId: string | null;
                    createdAt: Date | null;
                }[];
                422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                };
            };
        };
    };
} & {
    orders: {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    orders: {
                        id: string;
                        customer: string;
                        orderId: string;
                        status: "refunded" | "delivered" | null;
                        bannerTitle: string | null;
                        productName: string;
                        category: string | null;
                        plan: string;
                        quantity: number;
                        unitPrice: number;
                        subtotal: number;
                        total: number;
                        externalId: string | null;
                        createdAt: Date;
                    }[];
                };
            };
        };
    };
} & {
    "sync-inventory-batches": {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: string;
            };
        };
    };
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
} & {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
}>;

export { server as default };
