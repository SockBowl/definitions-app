import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class NewCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  //handleClose and handleAdd have both been passed by Nav.js
  handleSubmit() {
    this.props.handleClose();
    this.props.handleNewCourse(this.state.title);
  }

  render() {
    const { open, handleClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        maxWidth={'xs'}
        fullWidth
      >
        <DialogTitle id='form-dialog-title'>Add New Course</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            id='name'
            name='title'
            label='Course Name'
            type='text'
            fullWidth
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NewCourse;
