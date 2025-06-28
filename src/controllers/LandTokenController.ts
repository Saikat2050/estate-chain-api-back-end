import { NextFunction, Request, Response } from "express"

import { ApiResponse } from "../libs/ApiResponse"
import LandTokenCreateService from "../services/LandTokenCreateService"
import LandTokenDetailsService from "../services/LandTokenDetailsService"
import LandTokenListService from "../services/LandTokenListService"
import LandTokenSignService from "../services/LandTokenSignService"

class LandTokenController {
	constructor() {
		this.createLandToken = this.createLandToken.bind(this)
		this.listLandToken = this.listLandToken.bind(this)
		this.fetchLandToken = this.fetchLandToken.bind(this)
		this.signLandToken = this.signLandToken.bind(this)
	}

	public async createLandToken(req: Request, res: Response, next: NextFunction) {
		try {
			const response = new ApiResponse(res)
			const data = await LandTokenCreateService.createLandToken(req.body)

			// return response
			return response.successResponse({
				message: `Land Token created successfully`,
				data
			})
		} catch (error) {
			next(error)
		}
	}

	public async listLandToken(req: Request, res: Response, next: NextFunction) {
		try {
			const response = new ApiResponse(res)
			const data = await LandTokenListService.listLandToken()

			return response.successResponse({
				message: `Land/s fetched successfully`,
				data
			})
		} catch (error) {
			next(error)
		}
	}

	public async fetchLandToken(req: Request, res: Response, next: NextFunction) {
		try {
			const response = new ApiResponse(res)
			const data = await LandTokenDetailsService.fetchLandToken(req.params.cid)

			return response.successResponse({
				message: `Land details fetched successfully`,
				data
			})
		} catch (error) {
			next(error)
		}
	}

	public async signLandToken(req: Request, res: Response, next: NextFunction) {
		try {
			const response = new ApiResponse(res)
			const data = await LandTokenSignService.signLandToken(req.body)

			return response.successResponse({
				message: `Land Token Signed successfully`,
				data
			})
		} catch (error) {
			next(error)
		}
	}
}

export default new LandTokenController()
