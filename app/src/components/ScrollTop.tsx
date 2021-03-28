import { makeStyles, Theme } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Zoom from '@material-ui/core/Zoom'

const useStyles = makeStyles((theme: Theme) => ({
	scroll: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}))

interface IScrollTop {
	window?: () => Window
}
const ScrollTop: React.FC<IScrollTop> = (props) => {
	const classes = useStyles()
	const { children, window } = props

	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	})
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const anchor = (
			(event.target as HTMLDivElement).ownerDocument || document
		).querySelector('#back-to-top-anchor-primary')
		if (anchor)
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
	}
	return (
		<Zoom in={trigger}>
			<div
				onClick={handleClick}
				role="presentation"
				className={classes.scroll}>
				{children}
			</div>
		</Zoom>
	)
}
export default ScrollTop
