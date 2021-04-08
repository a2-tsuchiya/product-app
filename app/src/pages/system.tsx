import * as React from 'react'
import Link from 'next/link'
import PageHead from 'src/layouts/PageHead'
import { useAppContext } from 'src/foundations/AppProvider'
import { makeStyles, Theme } from '@material-ui/core/styles'
import BreadCrumbs from 'src/components/BreadCrumbs'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		margin: theme.spacing(1),
	},
	title: {
		marginTop: theme.spacing(1.5),
		marginBottom: theme.spacing(2.5),
	},
}))

const SystemPage = () => {
	const classes = useStyles()
	const { dispatch } = useAppContext()

	// Switch header menu cursor
	React.useEffect(() => {
		dispatch({ tabValue: { payload: 4 } })
	}, [])

	return (
		<div className={classes.root}>
			<PageHead title="System | Product Lineup" />
			<BreadCrumbs current="システム開発" />
			<Typography
				variant="h5"
				component="h2"
				className={classes.title}
				gutterBottom>
				システム開発
			</Typography>
			<p>Comming soon...</p>
			<p>
				<Link href="/">
					<a>Go home</a>
				</Link>
			</p>
		</div>
	)
}
export default SystemPage
