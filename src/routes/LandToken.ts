import express, { Router } from "express";
import LandTokenController from "../controllers/LandTokenController";

export class LandToken {
  public readonly router: Router;
  constructor() {
    this.router = express.Router();
    this.router
      .post("/create", LandTokenController.createLandToken)
      .get("/list", LandTokenController.listLandToken)
      .get("/details/:cid", LandTokenController.fetchLandToken)
      .patch("/sign", LandTokenController.signLandToken);
  }
}
