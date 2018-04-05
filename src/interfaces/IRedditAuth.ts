/**
 * Represents reddit's OAuth response structure
 *
 * @export
 * @interface IRedditAuth
 */
export interface IRedditAuth {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}
