import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		margin: theme.spacing(1),
	},
	title: {
		marginTop: theme.spacing(1.5),
		marginBottom: theme.spacing(2.5),
	},
	subtitle: {
		marginTop: theme.spacing(2),
	},
	icon: {
		marginRight: theme.spacing(1),
		verticalAlign: 'middle',
		display: 'inline-flex',
	},
}))
export default useStyles
