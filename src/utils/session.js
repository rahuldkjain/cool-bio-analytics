function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}
export function deleteCookie(name) {
    document.cookie =
        "__Session-analytics.cool.bio-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function getSessionToken() {
    const token = getCookie("__Session-analytics.cool.bio-token");
    return token;
}
