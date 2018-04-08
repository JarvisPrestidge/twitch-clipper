const oauthToken = process.env.TWITCH_BOT_OAUTH_TOKEN;

if (!oauthToken) {
    throw new Error("Invalid twitch environment variable for SuspectGodBot");
}

const options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "SuspectGodBot",
        password: oauthToken
    },
    channels: ["#SuspectGod"]
};

export default options;
