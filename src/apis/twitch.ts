import * as request from "request-promise-native";
import { Headers, Options } from "request";
import { ITwitchClip } from "../interfaces/ITwitchClip";

/**
 * Responsible for interacting with Twitch apis
 * 
 * @class Twitch
 */
class Twitch {

    private readonly baseUri = "https://api.twitch.tv/kraken";

    public async getTopClips(limit = 1): Promise<ITwitchClip[]> {

        const uri = `${this.baseUri}/clips/top`;

        const channel = process.env.TWITCH_CHANNEL;  
        const clientId = process.env.TWITCH_CLIENT_ID;  

        if (!channel || !clientId) {
            throw new Error("Invalid twitch channel environment variable");
        }

        const headers: Headers = { 
            "Accept": "application/vnd.twitchtv.v5+json",
            "Client-ID": clientId
        };

        const qs: any = { 
            channel,
            limit
        };

        const options: Options = {
            uri,
            method: "GET",
            headers,
            qs,
            gzip: true,
            json: true
        };

        let response: { clips: ITwitchClip[] };

        try {
            response = await request(options);
        } catch (err) {
            throw new Error(`Failed to retrieve top clips: ${err.message}`);
        }

        const clips = response.clips;

        return clips;
    }
}

export default Twitch;