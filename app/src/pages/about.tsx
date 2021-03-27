import Link from 'next/link'
import SampleLayout from 'src/layouts/SampleLayout'

const AboutPage = () => (
	<SampleLayout title="About | Next.js + TypeScript Example">
		<h1>About</h1>
		<p>This is the about page</p>
		<p>
			<Link href="/">
				<a>Go home</a>
			</Link>
		</p>
	</SampleLayout>
)

export default AboutPage
