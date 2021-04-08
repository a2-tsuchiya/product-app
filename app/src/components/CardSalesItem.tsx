import * as React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CardActionArea from '@material-ui/core/CardActionArea'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Rating from '@material-ui/lab/Rating'
import { SalesItem } from '.prisma/client'
import { Relation } from 'src/interfaces'

const useStyles = makeStyles((theme: Theme) => ({
	card: {
		display: 'flex',
		width: '70%',
	},
	cardDetails: {
		flex: 1,
	},
	cardMedia: {
		width: 160,
	},
	chip: {
		margin: theme.spacing(0.5),
	},
}))

interface CardProps {
	item: SalesItem & Relation
}
const CardSalesItem: React.FC<CardProps> = ({ item }) => {
	const classes = useStyles()
	const { id, name, menu, costType, bujinessType, adType } = item
	const [value, setValue] = React.useState<number | null>(2)

	return (
		<Grid item xs={12} md={12}>
			{/* <Link href="#"> */}

			<Card className={classes.card}>
				<CardActionArea
					component="a"
					onClick={() => alert('show more...')}>
					<div className={classes.cardDetails}>
						<CardContent>
							<Typography component="h2" variant="h5">
								{name}
							</Typography>
							<Typography
								variant="subtitle1"
								color="textSecondary">
								{menu}
							</Typography>
						</CardContent>
						<CardContent>
							<Chip label={id} className={classes.chip} />
							<Chip
								label={bujinessType}
								className={classes.chip}
							/>
							<Chip label={costType} className={classes.chip} />
							<Chip label={adType} className={classes.chip} />
						</CardContent>
					</div>
				</CardActionArea>
				<CardActions>
					<Rating
						name="simple-conrtolled"
						value={value}
						onChange={(_, newValue) => {
							setValue(newValue)
						}}
					/>
				</CardActions>
			</Card>
			{/* </Link> */}
		</Grid>
	)
}
export default CardSalesItem
