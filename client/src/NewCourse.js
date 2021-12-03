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
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleCancel() {
    this.props.handleClose();
    //Timeout because reverting changes is visible during the dialog closing animation.
    setTimeout(() => {
      this.setState({ title: '' });
    }, 500);
  }

  //handleClose and handleAdd have both been passed by Nav.js
  handleSubmit() {
    this.props.handleClose();
    this.props.handleNewCourse(this.state.title);
    setTimeout(() => {
      this.setState({ title: '' });
    }, 500);
  }

  render() {
    const { open } = this.props;
    const { title } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleCancel}
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
            label='Course Title'
            type='text'
            value={title}
            fullWidth
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color='primary'>
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
