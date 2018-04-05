import * as dotenv from "dotenv";
import Twitch from "./apis/twitch";

// Load .env variables
dotenv.config();

const start = async () => {

    const twitch = new Twitch();

    const topClips = await twitch.getTopClips(5);

    console.log(JSON.stringify(topClips[0], undefined, 2));
    for (const clip of topClips) {
        console.log(`Title:     ${clip.title}`);
        console.log(`Url:       ${clip.url}`);
    }
};

start();