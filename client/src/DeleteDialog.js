import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteDialog extends Component {
  render() {
    const { term, id, open, toggleOpen, handleConfirm } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={toggleOpen}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Deleting {term}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Deletion will permanently remove the term and definition from the
              database. Are you sure you wish to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleOpen} color='primary'>
              Cancel
            </Button>
            <Button onClick={() => handleConfirm(id)} color='primary' autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteDialog;
