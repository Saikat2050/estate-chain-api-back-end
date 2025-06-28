import {NextFunction, Request, Response} from "express"
import Ajv from "ajv"

// import schemas from "../../schema/cache.json"
/* eslint-disable */
const schemas = require("../../schema/cache.json")
/* eslint-enable */

const ajv = new Ajv()

class Validator {
	public async schemaValidation(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const reqUrl: string = req.url
		const typeModule: string[] = reqUrl.split("/")
		typeModule.pop()
		const schemaModulePath = Object.keys(schemas).find(
			(el) => el === typeModule.join("/")
		)

		if (schemaModulePath) {
			// @ts-ignore
			const schemaModule = schemas[schemaModulePath]
			// @ts-ignore
			const schema = schemaModule["schemas"]
			const apiSchema = Object.keys(schema).find((el) => el === reqUrl)
			if (apiSchema) {
				// @ts-ignore
				const valid = ajv.validate(schema[apiSchema], req.body)

				if (!valid) {
					next({
						statusCode: 403,
						code: `invalid_data`,
						message: ajv.errors?.[0]?.message
					})
				}
			}
		}
		next()
	}
}

export default new Validator()
