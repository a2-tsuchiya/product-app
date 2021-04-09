import * as React from 'react'
import Link from 'next/link'
import { useAppContext } from 'src/foundations/AppProvider'
import { signIn, signOut, useSession } from 'next-auth/client'
/** Material-UI */
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { TabProps } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import CssBaseline from '@material-ui/core/CssBaseline'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
/** Material-Icon */
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import MoreIcon from '@material-ui/icons/MoreVert'
/** Styles */
import useStyles from 'src/styles/headerLayout'
/** Components */
import ScrollTop from 'src/components/ScrollTop'
/** Mapping */
import categoryMap from 'src/foundations/categoryMap'

type LinkTabProps = Omit<
	TabProps<'a', { href: string; label: string }>,
	'component' | 'button'
>
/**
 * Wrap Tabs-Element(MUI) with Link-Element(Next)
 * @see https://github.com/mui-org/material-ui/tree/next/examples/nextjs#the-link-component
 */
const LinkTab = React.forwardRef<HTMLAnchorElement, LinkTabProps>(
	(props, forwardRef) => {
		const { label, href, ...other } = props
		return (
			<Link href={href}>
				<Tab component="a" label={label} ref={forwardRef} {...other} />
			</Link>
		)
	}
)

interface IHeaderLayout {
	window?: () => Window
	title: string
}
const HeaderLayout: React.FC<IHeaderLayout> = (props) => {
	const classes = useStyles()
	const { children, title } = props
	const { state, dispatch } = useAppContext()
	const [session, loading] = useSession()
	const [color, setColor] = React.useState<'default' | 'secondary'>('default')

	const handleClickSignIn = () => signIn()
	const handleClickSignOut = () => signOut()
	const handleChange = (_: React.ChangeEvent<{}>, newValue: number) =>
		dispatch({ tabValue: { payload: newValue } })
	const handleClickEdit = () => {
		if (color === 'default') {
			setColor('secondary')
			dispatch({ edittable: { payload: true } })
		} else {
			setColor('default')
			dispatch({ edittable: { payload: false } })
		}
	}

	if (loading) return <div>Loading...</div>

	return (
		<>
			<CssBaseline />
			<AppBar>
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="header menu">
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6">
						{title}
					</Typography>
					{!session && (
						<Button color="inherit" onClick={handleClickSignIn}>
							Login
						</Button>
					)}
					{session && (
						<>
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder="Search..."
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									inputProps={{ 'aria-label': 'search' }}
								/>
							</div>
							<IconButton
								aria-label="display more actions"
								edge="end"
								color="inherit">
								<MoreIcon />
							</IconButton>
							<Button
								color="inherit"
								onClick={handleClickSignOut}>
								Logout
							</Button>
						</>
					)}
				</Toolbar>
				{session && (
					<Toolbar
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<Tabs
							value={state.tabValue}
							onChange={handleChange}
							aria-label="global nav tabs">
							{categoryMap.map((category) => (
								<LinkTab
									label={category.name}
									href={category.href}
									key={category.name}
								/>
							))}
						</Tabs>
						<Button
							variant="contained"
							color={color}
							onClick={handleClickEdit}>
							編集モード
						</Button>
					</Toolbar>
				)}
			</AppBar>
			{session && (
				<>
					<Toolbar id="back-to-top-anchor-primary" />
					<Toolbar id="back-to-top-anchor-secondary" />
					{children}
					<ScrollTop {...props}>
						<Fab
							color="primary"
							size="large"
							aria-label="scroll back to top">
							<KeyboardArrowUpIcon />
						</Fab>
					</ScrollTop>
				</>
			)}
		</>
	)
}
export default HeaderLayout
