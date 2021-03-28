import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest, NextApiResponse } from 'next'

const findUserByCredentials = (credentials: Record<string, string>) => {
	if (
		credentials.username === process.env.USER_ID &&
		credentials.password === process.env.USER_SECRET
	) {
		return { id: 1, name: 'root' }
	} else {
		return null
	}
}
const options = {
	providers: [
		Providers.Credentials({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				const user = findUserByCredentials(credentials)
				if (user) return Promise.resolve(user)
				else return Promise.resolve(null)
			},
		}),
	],
}
/**
 * Simple ID/PW Auth
 * @see https://zenn.dev/okumura_daiki/articles/c9e0065716d862
 */
export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options)
