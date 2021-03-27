import Link from 'next/link'
import SampleLayout from 'src/layouts/SampleLayout'

const IndexPage = () => (
	<SampleLayout title="Home | Next.js + TypeScript Example">
		<h1>Hello Next.js 👋</h1>
		<p>
			<Link href="/about">
				<a>About</a>
			</Link>
		</p>
	</SampleLayout>
)

export default IndexPage
