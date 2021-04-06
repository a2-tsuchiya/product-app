import { makeStyles, Theme } from '@material-ui/core/styles'
import Link from 'next/link'
import Fab from '@material-ui/core/Fab'
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		margin: theme.spacing(2),
	},
}))

const TopFab = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Link href="/">
				<Fab color="primary" aria-label="home">
					<HomeIcon />
				</Fab>
			</Link>
		</div>
	)
}
export default TopFab
