import Link from 'next/link'
import PageHead from 'src/layouts/PageHead'
import categoryMap from 'src/foundations/categoryMap'

const IndexPage = () => {
	return (
		<>
			<PageHead title="Top | Product Lineup" />
			<h1>Solution Categories 👋</h1>
			<ul>
				{categoryMap.map((category) => (
					<li key={category.name} value={category.name}>
						<Link href={category.href}>
							<a>{category.name}</a>
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}
export default IndexPage
