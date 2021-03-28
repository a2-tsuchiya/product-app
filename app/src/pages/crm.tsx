import Link from 'next/link'
import PageHead from 'src/layouts/PageHead'

const CrmPage = () => {
	return (
		<>
			<PageHead title="CRM | Product Lineup" />
			<h1>CRM Page</h1>
			<p>Comming soon...</p>
			<p>
				<Link href="/">
					<a>Go home</a>
				</Link>
			</p>
		</>
	)
}
export default CrmPage
