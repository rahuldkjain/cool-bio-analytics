import { ForbiddenError } from "vitedge/errors.js";
import jwt from "@tsndr/cloudflare-worker-jwt";

export function decodeToken(token) {
    const isValid = jwt.verify(token, "secret");
    if (isValid) {
        const payload = jwt.decode(token);
        return payload;
    } else {
        ForbiddenError("Not a valid user!");
    }
    return true;
}
