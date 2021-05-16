import { createClient } from "nhost-js-sdk";

const config = {
    baseURL: import.meta.env.VITE_BACKEND_BASE_API,
};

let client;

export const getClient = () => {
    if (!client) {
        client = createClient(config);
    }

    return client;
};
