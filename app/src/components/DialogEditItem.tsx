import * as React from 'react'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import { BujinessItem } from '.prisma/client'
import { Relation } from 'src/interfaces'

interface DialogProps {
	item: BujinessItem & Relation
}

const DialogEditItem: React.FC<DialogProps> = ({ item }) => {
	const [open, setOpen] = React.useState(false)
	const handleClickOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<div>
			<Fab
				size="medium"
				color="primary"
				aria-label="edit"
				onClick={handleClickOpen}>
				<EditIcon />
			</Fab>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle id="form-dialog-title">{item.name}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email
						address here. We will send updates occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="営業品目名"
						defaultValue={item.name}
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="営業品目カナ名"
						defaultValue={item.nameKana}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Subscribe
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
export default DialogEditItem
