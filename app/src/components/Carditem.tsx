import * as React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		minWidth: 275,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'wrap',
		listStyle: 'none',
		margin: theme.spacing(4),
	},
	pos: {
		marginBottom: 12,
	},
}))
interface CardProps {
	title: string
}
const CardItem: React.FC<CardProps> = ({ title }) => {
	const classes = useStyles()

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant="h5" component="h2">
					{title}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					Description
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">SHOW DETAIL</Button>
			</CardActions>
		</Card>
	)
}
export default CardItem
