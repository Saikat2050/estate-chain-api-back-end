import AxiosHelper from "../utils/axiosHelper";

class LandTokenDetailsService {
  constructor() {
    this.fetchLandToken = this.fetchLandToken.bind(this);
  }

  public async fetchLandToken(cid: string) {
    try {
      const axiosHelper = new AxiosHelper(
        process.env.LIGHTHOUSE_BASE_URL as string
      );

      const data = await axiosHelper.request(`/ipfs/${cid}`);

      return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new LandTokenDetailsService();
