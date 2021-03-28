import Link from 'next/link'
import PageHead from 'src/layouts/PageHead'

const SystemPage = () => {
	return (
		<>
			<PageHead title="System | Product Lineup" />
			<h1>System-Integration Page</h1>
			<p>Comming soon...</p>
			<p>
				<Link href="/">
					<a>Go home</a>
				</Link>
			</p>
		</>
	)
}
export default SystemPage
