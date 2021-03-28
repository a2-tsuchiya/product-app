import Link from 'next/link'
import PageHead from 'src/layouts/PageHead'

const WebPage = () => {
	return (
		<>
			<PageHead title="Web | Product Lineup" />
			<h1>Web-Integration Page</h1>
			<p>Comming soon...</p>
			<p>
				<Link href="/">
					<a>Go home</a>
				</Link>
			</p>
		</>
	)
}
export default WebPage
