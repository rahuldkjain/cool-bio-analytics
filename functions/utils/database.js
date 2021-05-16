import { BadRequestError } from "vitedge/errors";

import { decodeToken } from "./helpers";

const customerQuery = `
    query getCustomer($userId: uuid!) {
        customers_by_pk(id: $userId) {
            stripe_customer_id
        }
    }
`;

const productQuery = `
    mutation product($object: [product_insert_input!]!) {
        insert_product(objects: $object) {
            returning {
                id
            }
        }
    }
`;

const priceQuery = `
    mutation price($object: [product_insert_price!]!) {
        insert_price(objects: $object) {
            returning {
                id
            }
        }
    }
`;

const activeProducts = `
    query getproducts {
        product(
        where: {
            active: {
            _eq: true
            }
            }
        ) {
        id
        name
        prices(where: {
            active: {
            _eq: true
            }
        }) {
            id
            unit_amount
        }
        }
    }
`;

async function postGraphQlData(query, variables) {
    const res = await fetch(process.env.VITEDGE_GRAPHQL_API, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
                process.env.VITEDGE_WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });
    return await res.json();
}

export async function getActiveProductsWithPrices() {
    const data = await postGraphQlData(activeProducts, {});
    return data?.product || {};
}

export async function getCustomer(token) {
    console.log("getUser", token);
    try {
        const data = await decodeToken(token);
        const userId = data["https://hasura.io/jwt/claims"]["x-hasura-user-id"];
        const customer = await postGraphQlData(customerQuery, {
            userId,
        });
        console.log("customer-------->", customer);
        const {
            data: { customers_by_pk: customerById },
        } = customer;
        console.log("customerById-------->", customerById);
        return customerById ? customerById.stripe_customer_id : customerById;
    } catch (err) {
        throw new BadRequestError("Method not supported!");
    }
}

export async function upsertProductRecord(product) {
    const productData = {
        id: product.id,
        active: product.active,
        name: product.name,
        description: product.description,
        image: product.images?.[0] ?? null,
        metadata: product.metadata,
    };

    const savedProductData = await postGraphQlData(productQuery, productData);
    console.log(`Product inserted/updated: ${product.id}`);
    return savedProductData;
}

export async function upsertPriceRecord(price) {
    const priceData = {
        id: price.id,
        product_id: price.product,
        active: price.active,
        currency: price.currency,
        description: price.nickname,
        type: price.type,
        unit_amount: price.unit_amount,
        interval: price.recurring?.interval ?? null,
        interval_count: price.recurring?.interval_count ?? null,
        trial_period_days: price.recurring?.trial_period_days ?? null,
        metadata: price.metadata,
    };

    const savedProductData = await postGraphQlData(priceQuery, priceData);
    console.log(`Price inserted/updated: ${price.id}`);
    return savedProductData;
}
