import Head from 'next/head'

interface IPageHead {
	title: string
}
const PageHead: React.FC<IPageHead> = (props) => {
	const { children, title } = props
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			{children}
		</>
	)
}
export default PageHead
