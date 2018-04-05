import * as request from "request-promise-native";
import { AuthOptions } from "request";

export type HTTPMethod = "GET" | "POST";

export interface IHeaders {
    [key: string]: any;
}

export interface IQueryStrings {
    [key: string]: any;
}

/**
 * Generic request function
 *
 *
 * @template T
 * @param {string} uri
 * @param {HTTPMethod} method
 * @param qs
 * @param {any} [body]
 * @returns {Promise<T>}
 */
export const genericRequest = async <T>(
    uri: string,
    method: HTTPMethod,
    qs?: IQueryStrings,
    headers?: IHeaders,
    auth?: AuthOptions
): Promise<T> => {

    const requestOptions: request.Options = {
        uri,
        method,
        gzip: true,
        json: true
    };

    if (qs) {
        requestOptions.qs = qs;
    }

    if (headers) {
        requestOptions.headers = headers;
    }

    if (auth) {
        requestOptions.auth = auth;
    }

    let response: T;
    try {
        response = await request(requestOptions);
    } catch (err) {
        throw err.message;
    }

    return response;
};
