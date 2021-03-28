import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { Category } from '@prisma/client'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		// const _res = await axios.get<Category[]>(
		// 	`${process.env.ENDPOINT}/category`
		// )
		const _res = await axios.get<Category[]>('/category')
		if (!Array.isArray(_res.data)) {
			throw new Error('Cannot find category data')
		}

		res.status(200).json(_res.data)
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message })
	}
}

export default handler
