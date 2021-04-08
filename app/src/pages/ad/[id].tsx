import { GetStaticProps, GetStaticPaths } from 'next'
import useStyles from 'src/styles/adDetail'
import axios from 'src/foundations/axios'
import useSWR from 'swr'
import { BujinessItem, SalesItem } from '@prisma/client'
import { Relation } from 'src/interfaces'

import Grid from '@material-ui/core/Grid'
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined'
import Typography from '@material-ui/core/Typography'
import CardSalesItem from 'src/components/CardSalesItem'
import BreadCrumbs from 'src/components/BreadCrumbs'

interface IAdDetail {
	bujinessItem: BujinessItem
	salesItems: (SalesItem & Relation)[]
	errors?: string
}

const AdDetail: React.FC<IAdDetail> = (props) => {
	const classes = useStyles()
	const { bujinessItem, errors } = props

	if (errors) {
		return (
			<p>
				<span style={{ color: 'red' }}>Error:</span>
				{errors}
			</p>
		)
	}

	// State SaleItems
	const { data: salesItems, error } = useSWR('/salesItems', getSalesItems, {
		initialData: props.salesItems,
		revalidateOnFocus: false,
	})

	if (error) return <div>failed to load</div>
	if (!salesItems) return <div>loading...</div>

	return (
		<div className={classes.root}>
			<BreadCrumbs current={bujinessItem.name} />
			<Typography
				variant="h5"
				component="h2"
				className={classes.title}
				gutterBottom>
				営業品目: {bujinessItem.name}
			</Typography>
			<Typography
				variant="h6"
				component="h3"
				color="textPrimary"
				className={classes.subtitle}
				gutterBottom>
				<LocalOfferOutlinedIcon className={classes.icon} />
				売上明細（メニュー）
			</Typography>
			<Grid container className={classes.container} spacing={4}>
				{salesItems.map((item) => (
					<CardSalesItem key={item.id} item={item} />
				))}
			</Grid>
		</div>
	)
}
export default AdDetail

// SSG
export const getStaticPaths: GetStaticPaths = async () => {
	const res = await axios.post<(BujinessItem & Relation)[]>(
		'/bujinessitems',
		{}
	)
	const data = res.data
	const paths = data.map((d) => {
		return {
			params: { id: String(d.id) },
		}
	})
	return { paths, fallback: false }
}

const getBujinessItem = async (
	url: string
): Promise<BujinessItem & Relation> => {
	const res = await axios.get<BujinessItem & Relation>(url)
	return Promise.resolve(res.data)
}

const getSalesItems = async (
	url: string,
	id: string
): Promise<(SalesItem & Relation)[]> => {
	const res = await axios.post<(SalesItem & Relation)[]>(url, {
		bujinessItemId: id,
	})
	return Promise.resolve(res.data)
}

// SSG & ISR
export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const id = params?.id as string
		const bujinessItem = await getBujinessItem(`/bujinessitem/${id}`)
		const salesItems = await getSalesItems('/salesitems', id)

		return {
			props: { bujinessItem, salesItems },
			revalidate: 180,
		}
	} catch (err) {
		return { props: { errors: err.message } }
	}
}
