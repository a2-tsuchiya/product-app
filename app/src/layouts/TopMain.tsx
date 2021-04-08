import Link from 'next/link'
import { makeStyles, Theme } from '@material-ui/core/styles'
import BreadCrumbs from 'src/components/BreadCrumbs'
import Typography from '@material-ui/core/Typography'
import categoryMap from 'src/foundations/categoryMap'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		margin: theme.spacing(1),
	},
	title: {
		marginTop: theme.spacing(1.5),
		marginBottom: theme.spacing(2.5),
	},
}))

const TopMain = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<BreadCrumbs current="TOP" />
			<Typography
				variant="h5"
				component="h2"
				className={classes.title}
				gutterBottom>
				商品マスタ 👋
			</Typography>
			<ul>
				{categoryMap.map((category) => (
					<li key={category.name} value={category.name}>
						<Link href={category.href}>
							<a>{category.name}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
export default TopMain
