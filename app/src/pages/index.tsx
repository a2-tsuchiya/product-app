import Link from 'next/link'
import PageHead from 'src/layouts/PageHead'

const IndexPage = () => {
	return (
		<>
			<PageHead title="TOP" />
			<h1>Hello Next.js 👋</h1>
			<p>
				<Link href="/about">
					<a>About</a>
				</Link>
			</p>
		</>
	)
}
export default IndexPage
