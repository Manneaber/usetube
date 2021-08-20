import Channel from './types/channel';
export default function searchChannel(terms: string, token?: string, apikey?: string): Promise<{
    channels: Channel[];
    didyoumean: string;
    token: string;
    apikey: string;
}>;
