import { genericRequest, IHeaders, IQueryStrings } from "../utils/network";
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
        if (!channel) {
            throw new Error("Invalid twitch channel environment variable");
        }

        const qs: IQueryStrings = { 
            channel,
            limit
        };

        const clientId = process.env.TWITCH_CLIENT_ID;  
        if (!channel) {
            throw new Error("Invalid twitch channel environment variable");
        }

        const headers: IHeaders = { 
            "Accept": "application/vnd.twitchtv.v5+json",
            "Client-ID": clientId
        };

        let response;

        try {
            response = await genericRequest<{ clips: ITwitchClip[] }>(uri, "GET", qs, headers);
        } catch (err) {
            throw new Error(`Failed to retrieve top clips: ${err.message}`);
        }

        const clips = response.clips;

        return clips;
    }
}

export default Twitch;