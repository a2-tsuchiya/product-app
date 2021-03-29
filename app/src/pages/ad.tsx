import { GetStaticProps } from 'next'
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

export const getStaticProps: GetStaticProps = async () => {
	const res = await axios.post<IProductCategory[]>('/product/category')
	const productCategories = res.data
	return { props: { productCategories }, revalidate: 180 }
}
