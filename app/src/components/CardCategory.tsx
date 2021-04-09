import * as React from 'react'
import Link from 'next/link'
import { makeStyles, Theme } from '@material-ui/core/styles'
import categoryMap from 'src/foundations/categoryMap'

import Grid from '@material-ui/core/Grid'
import CardActionArea from '@material-ui/core/CardActionArea'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

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
	container: {
		flexGrow: 1,
		marginBottom: theme.spacing(2),
	},
}))

const CardCategory = () => {
	const classes = useStyles()
	return (
		<Grid container className={classes.container} spacing={4}>
			{categoryMap.map((item) => {
				if (item.href !== '/') {
					return (
						<Grid item xs={12} md={2} key={item.href}>
							<Link href={item.href}>
								<CardActionArea component="a">
									<Card>
										<CardContent>
											<Typography
												component="h2"
												variant="h5">
												{item.name}
											</Typography>
											<Typography
												variant="subtitle1"
												color="textSecondary">
												なんか説明文が欲しいよね。。
											</Typography>
										</CardContent>
										<CardActions>
											<Button
												size="large"
												color="primary">
												DETAIL
											</Button>
											<Button
												size="large"
												color="primary">
												CONTACT
											</Button>
										</CardActions>
									</Card>
								</CardActionArea>
							</Link>
						</Grid>
					)
				}
			})}
		</Grid>
	)
}
export default CardCategory
