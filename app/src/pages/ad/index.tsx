import * as React from 'react'
import axios from 'src/foundations/axios'
import useSWR from 'swr'
import PageHead from 'src/layouts/PageHead'
import TopFab from 'src/components/TopFab'
import { Segment, Product, BujinessItem } from '@prisma/client'
import { Relation } from 'src/interfaces'
import { GetStaticProps } from 'next'
import { useAppContext } from 'src/foundations/AppProvider'
import { makeStyles, Theme } from '@material-ui/core/styles'

import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined'
import Typography from '@material-ui/core/Typography'
import ChipsSegment from 'src/components/ChipsSegment'
import ChipsProduct from 'src/components/ChipsProduct'
import CardItem from 'src/components/CardItem'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		flexGrow: 1,
		marginBottom: theme.spacing(2),
	},
	icon: {
		marginRight: theme.spacing(1),
		verticalAlign: 'middle',
		display: 'inline-flex',
	},
}))

interface IAdPage {
	segments: Segment[]
	products: Product[]
	bujinessItems: (BujinessItem & Relation)[]
}

const AdPage: React.FC<IAdPage> = (props) => {
	const classes = useStyles()
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

	return (
		<>
			<PageHead title="Ads | Product Lineup" />
			<p style={{ color: 'red' }}>パンくず欲しいかも。。</p>
			<Typography variant="h5" component="h2" gutterBottom>
				広告代理サービス
			</Typography>
			<p style={{ color: 'red' }}>
				ページ遷移したときに選択肢をリセットする
			</p>
			<Typography
				variant="h6"
				component="h3"
				color="textPrimary"
				gutterBottom>
				<LocalOfferOutlinedIcon className={classes.icon} />
				セグメント
			</Typography>
			<ChipsSegment segments={segments} products={products} />
			<Typography
				variant="h6"
				component="h3"
				color="textPrimary"
				gutterBottom>
				<LocalOfferOutlinedIcon className={classes.icon} />
				商品／媒体
			</Typography>
			<ChipsProduct products={products} />
			<Typography
				variant="h6"
				component="h3"
				color="textPrimary"
				gutterBottom>
				<LocalOfferOutlinedIcon className={classes.icon} />
				営業品目
			</Typography>
			<Grid container className={classes.container} spacing={4}>
				{bujinessItems.map((item) => {
					if (state.productIds.find((id) => id === item.productId)) {
						return <CardItem item={item} />
					}
				})}
			</Grid>
			<Grid container>
				<Divider />
				<TopFab />
			</Grid>
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
const getBujinessItems = async (
	url: string
): Promise<(BujinessItem & Relation)[]> => {
	const res = await axios.post<(BujinessItem & Relation)[]>(url, {})
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
