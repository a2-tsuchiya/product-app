import { GetStaticProps } from 'next'
import useSWR from 'swr'
import Link from 'next/link'
import PageHead from 'src/layouts/PageHead'
import { Segment, Product } from '@prisma/client'

import axios from 'src/foundations/axios'

interface IAdPage {
	segments: Segment[]
	products: Product[]
}
const AdPage: React.FC<IAdPage> = (props) => {
	const { segments, products } = props
	const { data, error } = useSWR('/segment', getSegment, {
		initialData: segments,
		revalidateOnFocus: false,
	})

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const segmentList = data.map((item) => {
		return (
			<li key={item.id} value={item.id}>
				{item.name}
			</li>
		)
	})
	const majorList = products.map((item) => {
		if (item.primaryFlag) {
			return (
				<li key={item.id} value={item.id}>
					{item.name}
				</li>
			)
		}
	})

	return (
		<>
			<PageHead title="Ads | Product Lineup" />
			<h1>Ad-agency Page</h1>
			<p>This is the Advertising agency page</p>
			<p>Segments</p>
			<ul>{segmentList}</ul>
			<hr />
			<p>Major Products</p>
			<ul>{majorList}</ul>
			<p>
				<Link href="/">
					<a>Go home</a>
				</Link>
			</p>
		</>
	)
}
export default AdPage

const getSegment = async (url: string): Promise<Segment[]> => {
	const res = await axios.get<Segment[]>(url)
	return Promise.resolve(res.data)
}
const getProducts = async (url: string): Promise<Product[]> => {
	const res = await axios.post<Product[]>(url, {})
	return Promise.resolve(res.data)
}

export const getStaticProps: GetStaticProps = async () => {
	const segments = await getSegment('/segment')
	const products = await getProducts('/products')

	// return { props: { segment }, revalidate: 180 }
	return {
		props: {
			segments,
			products,
		},
		revalidate: 180,
	}
}
