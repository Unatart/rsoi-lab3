
export class CookieWorker {
    public get(name:string) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");

        if (parts.length === 2) {
            // @ts-ignore
            return parts.pop().split(";").shift();
        }
    }

    public set(name:string, value:string) {
        const date = new Date();

        date.setTime(date.getTime() + (360 * 24 * 60 * 60 * 1000));

        document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
    }

    public remove(name:string) {
        const date = new Date();

        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

        document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
    }
}