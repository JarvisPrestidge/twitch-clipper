import { genericRequest, IHeaders, IQueryStrings } from "../utils/network";
import { AuthOptions } from "request";
import { IRedditAuth } from "../interfaces/IRedditAuth";

/**
 * Responsible for interacting with Twitch apis
 * 
 * @class Reddit
 */
class Reddit {

    private readonly baseUri = "https://oauth.reddit.com/api";

    public async getAccessToken(): Promise<string> {

        const uri = "https://www.reddit.com/api/v1/access_token";

        const username = process.env.REDDIT_USERNAME;  
        const password = process.env.REDDIT_PASSWORD;  
        const clientId = process.env.REDDIT_CLIENT_ID;  
        const clientSecret = process.env.REDDIT_CLIENT_SECRET;  

        if (!username || !password || !clientId || !clientSecret) {
            throw new Error("Invalid reddit environment variables");
        }

        const qs: IQueryStrings = { 
            grant_type: "password",
            username,
            password
        };

        const headers: IHeaders = { 
            "Accept": "application/vnd.twitchtv.v5+json",
            "Client-ID": clientId
        };

        const auth: AuthOptions = {
            user: clientId,
            password: clientSecret
        };

        let response: IRedditAuth;

        try {
            response = await genericRequest<IRedditAuth>(uri, "GET", qs, headers, auth);
        } catch (err) {
            throw new Error(`Failed to retrieve reddit access token: ${err.message}`);
        }

        const accessToken = response.access_token;

        return accessToken;
    }
}

export default Reddit;