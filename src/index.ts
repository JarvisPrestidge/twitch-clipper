import * as dotenv from "dotenv";
// Load .env variables
dotenv.config();

import db from "./db/db";
import options from "./options";
import Reddit from "./apis/reddit";
import Twitch from "./apis/twitch";
import { IClip } from "./interfaces/IClip";
// import { ITwitchUser } from "./interfaces/ITwitchUser";

const tmi = require("tmi.js");

/**
 * Updates the database with new clips
 *
 * @returns {Promise<void>}
 */
const updateStoredClips = async (): Promise<void> => {
    const recentClips = await Twitch.getTopClips(5);

    for (const clip of recentClips) {
        // Search for clip in db
        const [result] = await db("clips").where({
            title: clip.title,
            url: clip.url
        });

        // Store clip if doesn't exist
        if (!result) {
            console.log(`New clip found: ${clip.title}`)
            await db("clips").insert({
                title: clip.title,
                url: clip.url,
                curator: clip.curator.display_name
            });
        }
    }
};

/**
 * Returns either the oldest un-posted clip or undefined
 *
 * @returns {(Promise<IClip | undefined>)}
 */
const getNextUnPostedClip = async (): Promise<IClip | undefined> => {
    // Get oldest un-posted clip
    const [result] = await db("clips")
        .where({ reddit: false })
        .orderBy("created_at", "DESC")
        .limit(1);

    return result;
};

/**
 * Returns either the oldest un-posted clip or undefined
 *
 * @param {IClip} clip
 * @returns {Promise<void>}
 */
const setRedditFlagTrue = async (clip: IClip): Promise<void> => {
    // Update the clips reddit posted flag
    await db("clips")
        .where({
            title: clip.title,
            url: clip.url
        })
        .update({ reddit: true });
};

// Create new tmi.js instance and connect
const client = new tmi.client(options);
client.connect();

client.on("connected", () => {
    client.action("SuspectGod", ": Connected and ready to serve... beep boop 🤖");
});

// client.on("chat", (_: string, user: ITwitchUser, message: string, self: boolean) => {
//     if (self) {
//         return;
//     }
//     if (/hi|hey|yo|wagwan|sup|hello/i.test(message)) {
//         client.action(
//             "SuspectGod", 
//             `: Hey ${user["display-name"]} 👋`
//         );
//     }
// });

const reddit = new Reddit();

const start = async () => {
    // Update stored clips
    await updateStoredClips();

    // Check for clips to upload
    const clip = await getNextUnPostedClip();

    if (clip) {
        // Post to reddit
        const redditPostUri = await reddit.submitPost(clip.title, clip.url, "fortnitebr");

        if (redditPostUri) {
            // Toggle the `reddit` flag on the db entry
            await setRedditFlagTrue(clip);

            // Post update to twitch chat
            client.action(
                "SuspectGod",
                `: 📽️ New clip - ${clip.title} posted to Reddit thanks to ${clip.curator} 🧡`
            );
            client.action(
                "SuspectGod",
                `: ➞ ${redditPostUri} Show it some love 😀`
            );
            
        }
    }

    await setTimeout(start, 10000);
};

start();
