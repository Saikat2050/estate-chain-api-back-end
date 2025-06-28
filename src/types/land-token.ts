export type LandTokenCreatePayload = {
  title: string;
  location: string;
  area: number;
  valuations: number;
  purpose: string;
  token: number;
  availability?: number;
  guid: string;
  tokenId: string;
};

export type LandTokenUploadResponse = {
  cid: string;
  ipfsURI: string;
  gatewayURL: string;
};

export type LandTokenSignPayload = {
  cid: string;
};
