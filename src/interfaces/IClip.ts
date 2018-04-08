/**
 * Represents the schema for a single clip
 * 
 * @export
 * @interface IClip
 */
export interface IClip {
    id: number;
    title: string;
    url: string;
    curator: string;
    reddit: boolean;
    created_at: Date;
    updated_at: Date;
}