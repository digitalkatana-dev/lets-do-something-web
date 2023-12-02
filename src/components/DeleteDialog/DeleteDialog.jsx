import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openDelete, setDeleteData } from '../../redux/slices/appSlice';

const DeleteDialog = ({ open }) => {
	const { deleteData } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(openDelete(false));
		dispatch(setDeleteData(null));
	};

	const handleDelete = () => {
		dispatch(deleteData?.action);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Delete?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete this {deleteData?.type} forever?
					Warning, this can not be undone!
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleDelete}>Delete</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteDialog;
