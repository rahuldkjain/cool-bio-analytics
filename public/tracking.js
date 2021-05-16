(async (_) => {
    if (typeof window !== "undefined") {
        const {
            location: { hostname, pathname },
            sessionStorage,
        } = window;
        try {
            const referrer = document.referrer;
            const key = `cool.bio:analytics:${hostname}`;
            const sessionId = sessionStorage.getItem(key);
            const response = await fetch(
                "https://analytics.cool.bio/api/v1/tracker",
                {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        referrer,
                        pathname,
                        sessionId,
                    }),
                }
            );
            const responseData = await response.json();
            if (!sessionId) {
                sessionStorage.setItem(key, responseData.sessionId);
            }

            async function onVisibilityAndStateChange() {
                const currentSessionId = sessionStorage.getItem(key);
                const {
                    location: { pathname: currentPath },
                } = window;
                if (document.visibilityState === "hidden") {
                    if (navigator.sendBeacon) {
                        navigator.sendBeacon(
                            "https://analytics.cool.bio/api/v1/tracker",
                            JSON.stringify({
                                referrer,
                                pathname: currentPath,
                                sessionId: currentSessionId,
                            })
                        );
                    } else {
                        fetch("https://analytics.cool.bio/api/v1/tracker", {
                            method: "post",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                referrer,
                                pathname: currentPath,
                                sessionId: currentSessionId,
                            }),
                        });
                    }
                }
            }

            history.pushState = ((f) =>
                function pushState() {
                    const ret = f.apply(this, arguments);
                    onVisibilityAndStateChange();
                    return ret;
                })(history.pushState);

            history.replaceState = ((f) =>
                function replaceState() {
                    const ret = f.apply(this, arguments);
                    onVisibilityAndStateChange();
                    return ret;
                })(history.replaceState);

            window.addEventListener("popstate", () => {
                onVisibilityAndStateChange();
            });
            document.addEventListener(
                "visibilitychange",
                onVisibilityAndStateChange
            );
        } catch (e) {
            console.error("There was an error!");
        }
    }
})();
