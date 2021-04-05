import { GetStaticProps } from 'next'
import Link from 'next/link'
import PageHead from 'src/layouts/PageHead'
import List from 'src/components/List'

import axios from 'src/foundations/axios'
import { Category } from '@prisma/client'

type Props = {
	categories: Category[]
}

const WithStaticProps = ({ categories }: Props) => {
	return (
		<>
			<PageHead title="Sample | Product Lineup" />
			<h1>Category List</h1>
			<p>
				Example fetching data from inside <code>getStaticProps()</code>.
			</p>
			<p>You are currently on: /category</p>
			<List categories={categories} />
			<p>
				<Link href="/">
					<a>Go home</a>
				</Link>
			</p>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	// Example for including static props in a Next.js function component page.
	// Don't forget to include the respective types for any props passed into
	// the component.
	const res = await axios.get<Category[]>('/category')
	const categories = res.data
	return { props: { categories } }
}

export default WithStaticProps
