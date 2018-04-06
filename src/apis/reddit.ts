import * as moment from "moment";
import * as request from "request-promise-native";
import C from "../utils/constants";
import { AuthOptions, Headers, Options } from "request";
import { IRedditAuthResponse } from "../interfaces/IRedditAuthResponse";
import { IRedditSubmitResponse } from "../interfaces/IRedditSubmitResponse";

type Moment = moment.Moment;

/**
 * Responsible for interacting with Twitch apis
 * 
 * @class Reddit
 */
class Reddit {

    private accessToken?: string; 
    private accessTokenExpiry?: Moment; 

    private readonly baseUri = "https://oauth.reddit.com/api";

    /**
     * Responsible for retrieving access token
     * 
     * @returns {Promise<string>} 
     */
    private async getAccessToken(): Promise<void> {

        const uri = "https://www.reddit.com/api/v1/access_token";

        const username = process.env.REDDIT_USERNAME;  
        const password = process.env.REDDIT_PASSWORD;  
        const clientId = process.env.REDDIT_CLIENT_ID;  
        const clientSecret = process.env.REDDIT_CLIENT_SECRET;  

        if (!username || !password || !clientId || !clientSecret) {
            throw new Error("Invalid reddit environment variables");
        }

        const qs: any = { 
            grant_type: "password",
            username,
            password
        };

        const auth: AuthOptions = {
            username: clientId,
            password: clientSecret
        };

        const options: Options = {
            uri,
            method: "POST",
            qs,
            auth,
            gzip: true,
            json: true
        };

        let response: IRedditAuthResponse;

        try {
            response = await request(options);
        } catch (err) {
            throw new Error(`Failed to retrieve reddit access token: ${err.message}`);
        }

        const accessToken = response.access_token;
        const expiry = moment().add(response.expires_in, "seconds");

        this.accessToken = accessToken;
        this.accessTokenExpiry = expiry;
    }

    /**
     * Responsible for submitting a post
     * 
     * @returns {Promise<string>} 
     */
    public async submitPost(title: string, url: string): Promise<string> {

        // Request new access token if invalid
        if (!this.accessToken || !this.accessTokenExpiry || this.accessTokenExpiry.isAfter()) {
            await this.getAccessToken();
        }

        const uri = `${this.baseUri}/submit`;

        const headers: Headers = { 
            "Authorization": `bearer ${this.accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": C.USER_AGENT
        };

        const form: any = {
            title,
            url,
            sr: "fortnitebr",
            kind: "link"
        };

        const options: Options = {
            uri,
            method: "POST",
            headers,
            form,
            json: true
        };


        let response: IRedditSubmitResponse;

        try {
            response = await request(options);
        } catch (err) {
            throw new Error(`Failed to retrieve reddit access token: ${err.message}`);
        }

        if (!response.success) {
            console.error("Reddit submission failed.")
        }

        // Value for newly created posts comments page.
        return response.jquery[18][3][0];
    }
}

export default Reddit;