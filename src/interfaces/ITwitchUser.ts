/**
 * Represents a Twitch api user object
 * 
 * @export
 * @interface ITwitchUser
 */
export interface ITwitchUser {
    "badges": {
        "broadcaster": string;
        "premium": string;
    };
    "color": string;
    "display-name": string;
    "emotes?": any;
    "id": string;
    "mod": boolean;
    "room-id": string;
    "subscriber": boolean;
    "tmi-sent-ts": string;
    "turbo": boolean;
    "user-id": string;
    "user-type?": any;
    "emotes-raw?": any;
    "badges-raw": string;
    "username": string;
    "message-type": string;
}