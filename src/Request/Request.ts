export interface IRequestParams {
    method:string,
    headers?:HeadersInit,
    body?:BodyInit | null
}

export async function Request(url:string, options:IRequestParams) {
    return await fetch(url, {
        method: options.method,
        headers: options.headers,
        body: options.body
    });
}
