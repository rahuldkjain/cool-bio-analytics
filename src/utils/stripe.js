import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
    }

    return stripePromise;
};
