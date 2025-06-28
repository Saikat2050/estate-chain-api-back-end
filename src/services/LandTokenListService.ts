
import _ from "lodash"
import AxiosHelper from "../utils/axiosHelper";

class LandTokenListService {
  constructor() {
    this.listLandToken = this.listLandToken.bind(this);
  }

  public async listLandToken() {
    try {
      let data = []
      const client = global.universalRedisClient;

      let cidArray = await client.get(`land_token_cid_arr`);

      if (!cidArray) {
        cidArray = []
      }

      cidArray =
          typeof cidArray === "string" ? JSON.parse(cidArray) : cidArray;

      if (cidArray.length) {
        const chuckedCIDArr =  _.chunk(cidArray, 10)

        const axiosHelper = new AxiosHelper(
          process.env.LIGHTHOUSE_BASE_URL as string
        )

        for (let chuckedCID of chuckedCIDArr) {
          const listedLandTokens = await Promise.all(chuckedCID.map((cid) => axiosHelper.request(`/ipfs/${cid}`)))

          if (listedLandTokens.length) {
            data = data.concat(listedLandTokens)
          }

          // Delay before next chunk
          await new Promise((resolve) => setTimeout(resolve, 250))
        }
      }

      return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new LandTokenListService();
