/**
 * Represents a single twitch clip
 * 
 * @export
 * @interface ITwitchClip
 */
export interface ITwitchClip {
    slug: string;
    tracking_id: string;
    url: string;
    embed_url: string;
    embed_html: string;
    broadcaster: {
        id: string;
        name: string;
        display_name: string;
        channel_url: string;
        logo: string;
    };
    curator: {
        id: string;
        name: string;
        display_name: string;
        channel_url: string;
        logo: string;
    };
    vod: {
        id: string;
        url: string;
        offset: number;
        preview_image_url: string;
    };
    broadcast_id: string;
    game: string;
    language: string;
    title: string;
    views: number;
    duration: number;
    created_at: Date;
    thumbnails: {
        medium: string;
        small: string;
        tiny: string;
    };
}
