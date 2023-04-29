/// <reference types="astro/client" />
interface ImportMetaEnv {
    // PG provider
    readonly USER: string;
    readonly PG_PASSWORD:string;
    readonly PG_HOST:string;
    readonly PG_PORT:number;
    // Firebase Auth
    readonly PUBLIC_API_KEY:string;
    readonly PUBLIC_AUTH_DOMAIN:string;
    readonly PUBLIC_PROJECT_ID:string;
    readonly PUBLIC_STORAGE_BUCKET:string;
    readonly PUBLIC_MESSAGING_SENDER_ID:string;
    readonly PUBLIC_APP_ID:string;
    readonly PUBLIC_MEASUREMENTID:string;
    readonly PUBLIC_MEASUREMENT_ID:string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
