import axios from 'axios'

/**
 * Env-Variables cannot read on Client-Side.
 * If you use the API from Client-Side, read Env-Variables from .env.local.
 */

const instance = axios.create({
	headers: {
		'Content-Type': 'application/json',
	},
	// baseURL: process.env.ENDPOINT,
	baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
})

export default instance
