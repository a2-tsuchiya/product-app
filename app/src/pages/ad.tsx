import Link from 'next/link'
import PageHead from 'src/layouts/PageHead'

const AdPage = () => {
	return (
		<>
			<PageHead title="Ads | Product Lineup" />
			<h1>Ad-agency Page</h1>
			<p>This is the Advertising agency page</p>
			<p>
				<Link href="/">
					<a>Go home</a>
				</Link>
			</p>
		</>
	)
}
export default AdPage
