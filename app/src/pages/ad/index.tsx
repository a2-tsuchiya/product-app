import * as React from 'react'
import axios from 'src/foundations/axios'
import useSWR from 'swr'
import PageHead from 'src/layouts/PageHead'
import useStyles from 'src/styles/adPage'
import { Segment, Product, BujinessItem } from '@prisma/client'
import { Relation } from 'src/interfaces'
import { GetStaticProps } from 'next'
import { useAppContext } from 'src/foundations/AppProvider'

import BreadCrumbs from 'src/components/BreadCrumbs'
import ChipsSegment from 'src/components/ChipsSegment'
import ChipsProduct from 'src/components/ChipsProduct'
import CardItem from 'src/components/Carditem'
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

interface IAdPage {
	segments: Segment[]
	products: Product[]
	bujinessItems: (BujinessItem & Relation)[]
	errors?: string
}

const AdPage: React.FC<IAdPage> = (props) => {
	const { errors } = props
	if (errors) {
		return (
			<p>
				<span style={{ color: 'red' }}>Error:</span>
				{errors}
			</p>
		)
	}

	const classes = useStyles()
	const { state, dispatch } = useAppContext()

	// State Segments
	const { data: segments, error: segmentError } = useSWR(
		'/segment',
		getSegments,
		{
			initialData: props.segments,
			revalidateOnFocus: false,
			refreshInterval: 1000,
		}
	)
	// State Products
	const { data: products, error: productError } = useSWR(
		'/product',
		getProducts,
		{
			initialData: props.products,
			revalidateOnFocus: false,
		}
	)
	// State BujinessItems
	const { data: bujinessItems, error: bujinessItemError } = useSWR(
		'/bujinessitems',
		getBujinessItems,
		{
			initialData: props.bujinessItems,
			revalidateOnFocus: false,
		}
	)

	// Switch header menu cursor
	React.useEffect(() => {
		dispatch({ tabValue: { payload: 1 } })
	}, [])

	if (segmentError) return <div>failed to load</div>
	if (productError) return <div>failed to load</div>
	if (bujinessItemError) return <div>failed to load</div>
	if (!segments) return <div>loading...</div>
	if (!products) return <div>loading...</div>
	if (!bujinessItems) return <div>loading...</div>

	return (
		<div className={classes.root}>
			<PageHead title="Ads | Product Lineup" />
			<BreadCrumbs current="広告代理" />
			<Typography
				variant="h5"
				component="h2"
				className={classes.title}
				gutterBottom>
				広告代理
			</Typography>
			<Typography
				variant="h6"
				component="h3"
				color="textPrimary"
				className={classes.subtitle}
				gutterBottom>
				<LocalOfferOutlinedIcon className={classes.icon} />
				セグメント
			</Typography>
			<ChipsSegment segments={segments} products={products} />
			<Typography
				variant="h6"
				component="h3"
				color="textPrimary"
				className={classes.subtitle}
				gutterBottom>
				<LocalOfferOutlinedIcon className={classes.icon} />
				商品／媒体
			</Typography>
			<ChipsProduct products={products} />
			<Typography
				variant="h6"
				component="h3"
				color="textPrimary"
				className={classes.subtitle}
				gutterBottom>
				<LocalOfferOutlinedIcon className={classes.icon} />
				営業品目
			</Typography>
			<Grid container className={classes.container} spacing={4}>
				{bujinessItems.map((item) => {
					if (state.productIds.find((id) => id === item.productId)) {
						return <CardItem key={item.id} item={item} />
					}
				})}
			</Grid>
		</div>
	)
}
export default AdPage

// SSG & SWR
const getSegments = async (url: string): Promise<Segment[]> => {
	const res = await axios.get<Segment[]>(url)
	return Promise.resolve(res.data)
}
const getProducts = async (url: string): Promise<Product[]> => {
	const res = await axios.post<Product[]>(url, {})
	return Promise.resolve(res.data)
}
const getBujinessItems = async (
	url: string
): Promise<(BujinessItem & Relation)[]> => {
	const res = await axios.post<(BujinessItem & Relation)[]>(url, {})
	return Promise.resolve(res.data)
}

// SSG & ISR
export const getStaticProps: GetStaticProps = async () => {
	try {
		const segments = await getSegments('/segment')
		const products = await getProducts('/products')
		const bujinessItems = await getBujinessItems('/bujinessitems')

		return {
			props: {
				segments,
				products,
				bujinessItems,
			},
			revalidate: 120, //sec
		}
	} catch (err) {
		return { props: { errors: err.message } }
	}
}
