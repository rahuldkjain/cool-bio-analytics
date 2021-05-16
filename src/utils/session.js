export async function getSession(req) {
    const { payload } = req.body;

    if (!payload) {
        throw new Error("Invalid request");
    }

    const {
        website: website_uuid,
        hostname,
        screen,
        language,
        cache,
    } = payload;

    if (cache) {
        const result = await parseToken(cache);

        if (result) {
            return result;
        }
    }

    if (!isValidUuid(website_uuid)) {
        throw new Error(`Invalid website: ${website_uuid}`);
    }

    const { userAgent, browser, os, ip, country, device } = await getClientInfo(
        req,
        payload
    );

    const website = await getWebsiteByUuid(website_uuid);

    if (!website) {
        throw new Error(`Website not found: ${website_uuid}`);
    }

    const { project_id } = website;
    const session_uuid = uuid(project_id, hostname, ip, userAgent, os);

    let session = await getSessionByUuid(session_uuid);

    if (!session) {
        session = await createSession(project_id, {
            session_uuid,
            hostname,
            browser,
            os,
            screen,
            language,
            country,
            device,
        });
    }

    const { session_id } = session;

    return {
        project_id,
        session_id,
    };
}
