const ACCESS_KEY = 'f82b09f38a0854e5d26d825c403bdb52';
const IPSTACK_BASE_URL = 'https://api.ipstack.com/'

export interface LocalizationResponse {
    ip: string;
    type: string;
    continent_code: string;
    continent_name: string;
    country_code: string;
    country_name: string;
    region_code: string;
    region_name: string;
    city: string;
    zip: string;
    latitude: number;
    longitude: number;
    location: Localization;
}

interface Localization {
    geoname_id: number;
    capital: string;
    languages: Language[],
    country_flag: string;
    country_flag_emoji: string;
    country_flag_emoji_unicode: string;
    calling_code: string;
    is_eu: boolean;
}

interface Language {
    code: string;
    name: string;
    native: string;
}



export const fetchLocalization = (ip: string): Promise<LocalizationResponse> => fetch(`${IPSTACK_BASE_URL}${ip}?access_key=${ACCESS_KEY}`).then(l => l.json());