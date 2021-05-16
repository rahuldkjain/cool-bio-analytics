export const postData = async ({ url, token, data = {} }) => {
    const withHost = `https://analytics.cool.bio${url}`;
    const res = await fetch(withHost, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json", token }),
        credentials: "same-origin",
        body: JSON.stringify(data),
    });

    if (res.error) {
        throw res.error;
    }

    return res.json();
};
