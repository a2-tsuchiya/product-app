import * as React from 'react'
import axios from 'src/foundations/axios'
import useSWR from 'swr'
import Link from 'next/link'
import PageHead from 'src/layouts/PageHead'
import { Segment, Product, BujinessItem } from '@prisma/client'
import { GetStaticProps } from 'next'
import { useAppContext } from 'src/foundations/AppProvider'

import ChipsSegment from 'src/components/ChipsSegment'
import ChipsProduct from 'src/components/ChipsProduct'
import CardItem from 'src/components/Carditem'

interface IAdPage {
	segments: Segment[]
	products: Product[]
	bujinessItems: BujinessItem[]
}
const AdPage: React.FC<IAdPage> = (props) => {
	const { bujinessItems } = props
	const { state } = useAppContext()

	const { data: segments, error: segmentError } = useSWR(
		'/segment',
		getSegments,
		{
			initialData: props.segments,
			revalidateOnFocus: false,
		}
	)
	const { data: products, error: productError } = useSWR(
		'/product',
		getProducts,
		{
			initialData: props.products,
			revalidateOnFocus: false,
		}
	)

	if (segmentError) return <div>failed to load</div>
	if (productError) return <div>failed to load</div>
	if (!segments) return <div>loading...</div>
	if (!products) return <div>loading...</div>

	const bujinessItemList = bujinessItems.map((item) => {
		if (state.productIds.find((id) => id === item.productId)) {
			return (
				<li key={item.id} value={item.id}>
					<CardItem title={item.name} />
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
			<ChipsSegment segments={segments} />
			<p>Major Products</p>
			<ChipsProduct products={products} />
			<p>Bujiness Items</p>
			<ul style={{ listStyle: 'none' }}>{bujinessItemList}</ul>
			<p>
				<Link href="/">
					<a>Go home</a>
				</Link>
			</p>
		</>
	)
}
export default AdPage

// SSR & SWR
const getSegments = async (url: string): Promise<Segment[]> => {
	const res = await axios.get<Segment[]>(url)
	return Promise.resolve(res.data)
}
const getProducts = async (url: string): Promise<Product[]> => {
	const res = await axios.post<Product[]>(url, {})
	return Promise.resolve(res.data)
}
const getBujinessItems = async (url: string): Promise<BujinessItem[]> => {
	const res = await axios.post<BujinessItem[]>(url, {})
	return Promise.resolve(res.data)
}

// SSR
export const getStaticProps: GetStaticProps = async () => {
	const segments = await getSegments('/segment')
	const products = await getProducts('/products')
	const bujinessItems = await getBujinessItems('/bujinessitems')

	// return { props: { segment }, revalidate: 180 }
	return {
		props: {
			segments,
			products,
			bujinessItems,
		},
		revalidate: 180,
	}
}
