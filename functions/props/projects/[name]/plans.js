import { defineEdgeProps } from "vitedge/define";
import { getActiveProductsWithPrices } from "../../../utils/database";

export default defineEdgeProps({
    handler({ params = {}, query = {} }) {
        const products = getActiveProductsWithPrices();
        console.log("products----->", products);
        return {
            data: {
                server: true,
                products,
                msg: `This is account details page ${params.resource || ""}`,
            },
        };
    },
    options: {
        cache: {
            api: 90,
            html: 90,
        },
    },
});
