import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

class NewDefinition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      definition: '',
      course: ''
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
      this.setState({ term: '', definition: '', course: '' });
    }, 500);
  }

  //handleClose and handleAdd have both been passed by Nav.js
  handleSubmit() {
    this.props.handleClose();
    this.props.handleAdd(
      this.state.term,
      this.state.definition,
      JSON.parse(this.state.course)
    );
    this.setState({ term: '', definition: '', course: '' });
  }

  render() {
    const { course } = this.state;
    const { open, courses } = this.props;
    const menuItems = courses.map((course) => {
      if (course.title.toLowerCase() === 'unassigned') {
        return '';
      }
      return (
        <MenuItem
          value={JSON.stringify({ title: course.title, _id: course._id })}
          key={course._id}
        >
          {course.title}
        </MenuItem>
      );
    });
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleCancel}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Add New Definition</DialogTitle>
          <DialogContent>
            <TextField
              margin='dense'
              id='term'
              name='term'
              label='Term'
              type='text'
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin='dense'
              id='definition'
              name='definition'
              label='Definition'
              type='text'
              multiline
              rows={4}
              fullWidth
              onChange={this.handleChange}
            />
            <InputLabel id='course-label'>Course</InputLabel>
            <Select
              labelId='course-label'
              id='course-select'
              name='course'
              value={course || ''} // THIS IS NEEDED FOR STRINGIFIED OBJECT
              defaultValue={''}
              onChange={this.handleChange}
              fullWidth
            >
              {menuItems}
            </Select>
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
      </div>
    );
  }
}

export default NewDefinition;
