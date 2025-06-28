
import {
	LandTokenCreatePayload,
	LandTokenUploadResponse
} from "../types/land-token";

import lighthouse from "@lighthouse-web3/sdk";
import eventEmitter from "../libs/logging";

class LandTokenCreateService {
  constructor() {
    this.createLandToken = this.createLandToken.bind(this);
    this.storeOffChain = this.storeOffChain.bind(this);
  }

  public async createLandToken(inputData: LandTokenCreatePayload) {
    try {
      inputData.availability = inputData.availability ? Number(inputData.availability) : 100
      const data: LandTokenUploadResponse = await this.storeOffChain(inputData);

      const client = global.universalRedisClient;

      let cidArray = await client.get(`land_token_cid_arr`);

      if (!cidArray) {
        const newCidArr: string[] = [];

        newCidArr.push(data.cid);

        await client.set(`land_token_cid_arr`, JSON.stringify(newCidArr));

        cidArray = await client.get(`land_token_cid_arr`);
      } else {
        cidArray =
          typeof cidArray === "string" ? JSON.parse(cidArray) : cidArray;

        cidArray.push(data.cid);

        await client.set(
          `land_token_cid_arr`,
          JSON.stringify([...new Set(cidArray)])
        );

        cidArray = await client.get(`land_token_cid_arr`);
      }

      return data;
    } catch (err) {
      throw err;
    }
  }

  public async storeOffChain(
    inputData: LandTokenCreatePayload
  ): Promise<LandTokenUploadResponse> {
    try {
      // Convert JSON payload to string
      const jsonString = JSON.stringify(inputData, null, 2);

      // Upload to Lighthouse
      const apiKey = process.env.LIGHTHOUSE_API_KEY as string;

      const uploadResponse = await lighthouse.uploadText(jsonString, apiKey);

	  eventEmitter.emit("logging", `Uploaded payload details: ${uploadResponse}`)

      const cid = uploadResponse.data.Hash;

      return {
        cid,
        ipfsURI: `ipfs://${cid}`,
        gatewayURL: `https://gateway.lighthouse.storage/ipfs/${cid}`,
      };
    } catch (err) {
      throw err;
    }
  }
}

export default new LandTokenCreateService();
