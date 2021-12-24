import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';


const DeleteDialog=(props)=>{

    return(
        <Dialog open ={props.open} onCancel={props.onCancel}>
            <DialogTitle>
                Delete Product
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this Product?
                </DialogContentText>
                <br/>
                {/* <Button name="delete" onClick={}></Button> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Cancel</Button>
                <Button color="secondary" variant='contained' onClick={props.onDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
        
    )
};

export default DeleteDialog