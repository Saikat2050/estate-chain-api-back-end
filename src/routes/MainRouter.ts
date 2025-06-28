import express from "express";

import { LandToken } from ".";

const router = express.Router();

router.use("/land-token", new LandToken().router);

export default router;
