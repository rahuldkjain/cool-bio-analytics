import { getActiveProductsWithPrices } from "../utils/database";

export default {
    async handler({ params = {}, query = {} }) {
        const products = await getActiveProductsWithPrices();
        return {
            data: {
                server: true,
                products,
                msg: `This is home page ${params.resource || ""}`,
            },
        };
    },
    options: {
        cache: {
            api: 90,
            html: 90,
        },
    },
};
