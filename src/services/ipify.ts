const IPIFY_BASE_URL = 'https://api.ipify.org';

export const fetchMyIp = (): Promise<string> => fetch(IPIFY_BASE_URL).then(ip => ip.text())