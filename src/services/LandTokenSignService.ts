import { LandTokenSignPayload } from "../types/land-token";

class LandTokenSignService {
  constructor() {
    this.signLandToken = this.signLandToken.bind(this);
  }

  public async signLandToken(inputData: LandTokenSignPayload) {
    try {
      const data = inputData;
      const client = global.universalRedisClient;

      let cidArray = await client.get(`land_token_cid_arr`);

      if (cidArray) {
        cidArray =
          typeof cidArray === "string" ? JSON.parse(cidArray) : cidArray;

        if (cidArray.length) {
          const index = cidArray.indexOf(inputData.cid.trim());

          if (index >= 0) {
            cidArray.splice(index, 1);
          }
        }

        await client.set(
          `land_token_cid_arr`,
          JSON.stringify([...new Set(cidArray)]),
        );

        cidArray = await client.get(`land_token_cid_arr`);
      }

      return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new LandTokenSignService();
