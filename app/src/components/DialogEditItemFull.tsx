import * as React from 'react'
import axios from 'src/foundations/axios'
import { makeStyles, Theme } from '@material-ui/core/styles'
import DialogConfirm from 'src/components/DialogConfirm'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { Product, BujinessItem } from '.prisma/client'
import { Relation } from 'src/interfaces'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import CloseButton from '@material-ui/icons/Close'
import StorageIcon from '@material-ui/icons/Storage'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'

const useStyles = makeStyles((theme: Theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	grid: {
		margin: theme.spacing(2),
	},
	text: {
		marginBottom: theme.spacing(4),
	},
}))

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />
})

interface DialogProps {
	item: BujinessItem & Relation
}

const DialogEditItemFull: React.FC<DialogProps> = ({ item }) => {
	const classes = useStyles()
	const { useState } = React
	const [open, setOpen] = useState(false)
	const [openConfirm, setOpenConfirm] = useState(false)
	const [products, setProducts] = useState([] as Product[])
	const [productId, setProductId] = useState(item.productId)

	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		setOpenConfirm(false)
	}
	const handleOpenChild = () => setOpenConfirm(true)
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setProductId(event.target.value)
	}

	React.useEffect(() => {
		const fetchData = async () => {
			const products = await axios.post<Product[]>(`/products`, {})
			setProducts(products.data)
		}
		fetchData()
	}, [])

	return (
		<div>
			<Fab
				size="medium"
				color="primary"
				aria-label="edit"
				onClick={handleOpen}>
				<EditIcon />
			</Fab>
			<Dialog
				open={open}
				fullScreen
				onClose={handleClose}
				TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}>
							<CloseButton />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							{item.name}
						</Typography>
						<IconButton
							edge="end"
							color="inherit"
							onClick={handleOpenChild}>
							<StorageIcon />
						</IconButton>
						<DialogConfirm
							isOpen={openConfirm}
							doClose={() => handleClose()}
						/>
					</Toolbar>
				</AppBar>
				<Grid item xs={12} md={6} className={classes.grid}>
					<TextField
						variant="outlined"
						margin="dense"
						id="bujinessitem_id"
						label="営業品目ID"
						defaultValue={item.id}
						disabled
					/>
					<TextField
						variant="outlined"
						margin="dense"
						id="bujinessitem_name"
						label="営業品目名"
						defaultValue={item.name}
						fullWidth
					/>
					<TextField
						variant="outlined"
						margin="dense"
						id="bujinessitem_namekana"
						label="営業品目カナ名"
						defaultValue={item.nameKana}
						fullWidth
						className={classes.text}
					/>
					<TextField
						variant="outlined"
						margin="dense"
						id="product_id"
						label="商品媒体ID"
						defaultValue={item.productId}
						disabled
					/>
					<TextField
						variant="outlined"
						margin="dense"
						id="product_name"
						label="商品媒体名"
						value={productId}
						fullWidth
						className={classes.text}
						onChange={handleChange}
						select>
						{products.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.id} : {item.name}
							</MenuItem>
						))}
					</TextField>
					<TextField
						variant="outlined"
						margin="dense"
						id="clientrule_id"
						label="クライアントルールID"
						defaultValue={item.clientRuleId}
						disabled
					/>
					<TextField
						variant="outlined"
						margin="dense"
						id="clientrule"
						label="クライアントルール"
						defaultValue={item.clientRule.name}
						fullWidth
						className={classes.text}
					/>
					<TextField
						variant="outlined"
						margin="dense"
						id="cancelrule_id"
						label="解約ルールID"
						defaultValue={item.cancelRuleId}
						disabled
					/>
					<TextField
						variant="outlined"
						margin="dense"
						id="cancelrule_name"
						label="解約ルール"
						defaultValue={item.cancelRule.name}
						fullWidth
						className={classes.text}
					/>
				</Grid>
			</Dialog>
		</div>
	)
}
export default DialogEditItemFull
