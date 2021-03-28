import Link from 'next/link'
import PageHead from 'src/layouts/PageHead'

const AboutPage = () => {
	return (
		<>
			<PageHead title="ABOUT" />
			<h1>About Page</h1>
			<p>This is the about page</p>
			<p>
				<Link href="/">
					<a>Go home</a>
				</Link>
			</p>
		</>
	)
}

export default AboutPage
