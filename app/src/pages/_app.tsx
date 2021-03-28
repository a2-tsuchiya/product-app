import React from 'react'
import 'src/styles/globals.css'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { Provider } from 'next-auth/client'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseLine from '@material-ui/core/CssBaseline'
import theme from 'src/styles/theme'

import AppContextProvider from 'src/foundations/AppProvider'
import HeaderLayout from 'src/layouts/HeaderLayout'

import axios from 'axios'
axios.defaults.baseURL = process.env.ENDPOINT

/**
 * Rendered on the Server-side and Client-side
 * @see https://qiita.com/tetsutaroendo/items/c7171286137d963cdecf
 */
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles)
		}
	}, [])

	return (
		<React.Fragment>
			<Head>
				<title>Product App</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseLine />
				<AppContextProvider>
					<HeaderLayout title="Product Lineup">
						<Provider session={pageProps.session}>
							<Component {...pageProps} />
						</Provider>
					</HeaderLayout>
				</AppContextProvider>
			</ThemeProvider>
		</React.Fragment>
	)
}
