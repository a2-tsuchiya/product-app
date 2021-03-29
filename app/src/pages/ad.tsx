import { GetStaticProps } from 'next'
import useSWR from 'swr'
import Link from 'next/link'
import PageHead from 'src/layouts/PageHead'

import axios from 'axios'

interface IProductCategory {
	id: string
	name: string
	flg: boolean
}
interface IAdPage {
	productCategories: IProductCategory[]
}
const AdPage: React.FC<IAdPage> = (props) => {
	const { productCategories } = props
	const { data, error } = useSWR('/product/category', fetcher, {
		initialData: props.productCategories,
		revalidateOnFocus: false,
	})

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	return (
		<>
			<PageHead title="Ads | Product Lineup" />
			<h1>Ad-agency Page</h1>
			<p>This is the Advertising agency page</p>
			<ul>
				{productCategories.map((item) => (
					<li key={item.id} value={item.id}>
						{item.name}
					</li>
				))}
			</ul>
			<p>
				<Link href="/">
					<a>Go home</a>
				</Link>
			</p>
		</>
	)
}
export default AdPage

const fetcher = async (url: string): Promise<IProductCategory[]> => {
	const res = await axios.post<IProductCategory[]>(url)
	return Promise.resolve(res.data)
}

export const getStaticProps: GetStaticProps = async () => {
	// const res = await axios.post<IProductCategory[]>('/product/category')
	// const productCategories = res.data
	const productCategories = await fetcher('/product/category')
	return { props: { productCategories }, revalidate: 180 }
}
