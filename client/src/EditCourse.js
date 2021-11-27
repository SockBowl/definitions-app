import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.courseTitle
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
    this.setState({ title: this.props.courseTitle });
  }

  //handleClose and handleUpdate have both been passed by ListDefs.js
  handleSubmit() {
    this.props.handleClose();
    this.props.handleCourseUpdate(this.state.title);
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
        <DialogTitle id='form-dialog-title'>Edit Course Title</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            id='name'
            name='title'
            label='Course Name'
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
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EditCourse;
