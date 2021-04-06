import Link from 'next/link'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CardActionArea from '@material-ui/core/CardActionArea'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import { BujinessItem } from '.prisma/client'
import { Relation } from 'src/interfaces'

const useStyles = makeStyles((theme: Theme) => ({
	card: {
		display: 'flex',
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
	item: BujinessItem & Relation
}
const CardItem: React.FC<CardProps> = ({ item }) => {
	const classes = useStyles()
	const { id, name, nameKana, product, clientRule, cancelRule } = item
	return (
		<Grid item xs={12} md={6}>
			<Link href={`/ad/${id}`}>
				<CardActionArea component="a">
					<Card className={classes.card}>
						<div className={classes.cardDetails}>
							<CardContent>
								<Typography component="h2" variant="h5">
									{name}
								</Typography>
								<Typography
									variant="subtitle1"
									color="textSecondary">
									{nameKana}
								</Typography>
							</CardContent>
							<CardContent>
								<Chip label={id} className={classes.chip} />
								<Chip
									label={product.name}
									className={classes.chip}
								/>
								<Chip
									label={clientRule.name}
									className={classes.chip}
									color={
										clientRule.id != '9999'
											? 'secondary'
											: 'default'
									}
								/>
								<Chip
									label={cancelRule.name}
									className={classes.chip}
									color={
										cancelRule.id != '9999'
											? 'secondary'
											: 'default'
									}
								/>
							</CardContent>
						</div>
						<CardActions>
							<Button size="small">MENU</Button>
						</CardActions>
					</Card>
				</CardActionArea>
			</Link>
		</Grid>
	)
}
export default CardItem
