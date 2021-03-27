import React from 'react'
import 'src/styles/globals.css'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseLine from '@material-ui/core/CssBaseline'
import theme from 'src/styles/theme'

/**
 * Global App Config
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
				<Component {...pageProps} />
			</ThemeProvider>
		</React.Fragment>
	)
}
