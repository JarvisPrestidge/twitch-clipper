import * as dotenv from "dotenv";
import Twitch from "./apis/twitch";
import Reddit from "./apis/reddit";

// Load .env variables
dotenv.config();

const start = async () => {

    const twitch = new Twitch();

    const topClips = await twitch.getTopClips(5);

    for (const clip of topClips) {
        console.log(`Title:     ${clip.title}`);
        console.log(`Url:       ${clip.url}`);
    }

    const reddit = new Reddit();

    const newPostUri = await reddit.submitPost("test", "https://clips.twitch.tv/GlamorousFrailSquirrelKevinTurtle");

    console.log(newPostUri);
};

start();