import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
	toolbar: {
		minHeight: 128,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: 'rgba(0,0,0,0.15)',
		'&:hover': {
			backgroundColor: 'rgba(0,0,0,0.25)',
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
		width: '100%',
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvnets: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
	},
}))
export default useStyles
