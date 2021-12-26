import Moralis from 'moralis';
import ABI from './assets/blog.abi.json';

export interface IProvider {
    getLatestPostID(): Promise<number>;
    getPosts(latestId: number, count: number): Promise<string[]>;
}

class MoralisProvider implements IProvider {
    private options: {chain: string, address: string, function_name: "getLatestRecordId" | "getRecord", abi: any, params: any};

    constructor(config: any, network: string, address: string) {
        Moralis.start({ serverUrl: config.serverUrl, appId: config.applicationId });
        this.options = {
            chain: network,
            address: address,
            function_name: "getLatestRecordId",
            abi: ABI,
            params: {}
          };
    }
    public async getLatestPostID() {
        const localOptions = {...this.options, function_name: "getLatestRecordId", params: {}};
        return parseInt(await Moralis.Web3API.native.runContractFunction(localOptions as any));
    }
    // Returns posts in reverse order.
    public async getPosts(latestId: number, count: number) {
        const localOptions = {...this.options, function_name: "getRecord", params: {id: ""}};
        const result = [];
        for (let index = latestId; index >= 0 && count > 0; count--, index--) {
            localOptions.params.id = index.toString();
            result.push(await Moralis.Web3API.native.runContractFunction(localOptions as any));
        }
        return result;
    }
}

export const getProvider = (config: any, address: string): IProvider => {
    {
        const parser = /avalanche-testnet\/(0x[A-Za-z0-9]{40})/;
        const match = address.match(parser);
        if (match)
            return new MoralisProvider(config, "avalanche testnet", match[1]);
    }
    throw `Unable to parse ${address}`;
}