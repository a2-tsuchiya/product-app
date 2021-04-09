import * as React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'

interface DialogProps {
	isOpen: boolean
	doClose: () => void
}

const DialogConfirm: React.FC<DialogProps> = ({ isOpen, doClose }) => {
	const [open, setOpen] = React.useState(false)
	const handleClose = () => doClose()

	React.useEffect(() => {
		setOpen(isOpen)
	}, [isOpen])

	return (
		<Dialog open={open} onClose={handleClose} keepMounted>
			<DialogTitle id="form-dialog-title">Update Database</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Can I reflect the changes in the database? It may take a few
					minutes to reflect.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="secondary">
					Cancel
				</Button>
				<Button onClick={handleClose} color="secondary">
					Update
				</Button>
			</DialogActions>
		</Dialog>
	)
}
export default DialogConfirm
