export const postData = async ({ url, token, data = {} }) => {
    // const withHost = `${url}`;
    const res = await fetch(url, {
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

export function parseUrl(url) {
    // Default values
    console.log("[parseUrl]", url);
    const defaultHost = "http://localhost:4000";
    const defaultPath = "/api/auth";

    if (!url) {
        url = `${defaultHost}${defaultPath}`;
    }

    // Default to HTTPS if no protocol explictly specified
    const protocol = url.startsWith("http:") ? "http" : "https";

    // Normalize URLs by stripping protocol and no trailing slash
    url = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

    // Simple split based on first /
    const [_host, ..._path] = url.split("/");
    const baseUrl = _host ? `${protocol}://${_host}` : defaultHost;
    const basePath = _path.length > 0 ? `/${_path.join("/")}` : defaultPath;
    console.log("[baseUrl, basePath]", baseUrl, basePath);
    return { baseUrl, basePath };
}
