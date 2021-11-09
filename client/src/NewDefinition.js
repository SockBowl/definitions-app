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
      courseName: ''
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
    this.props.handleAdd(
      this.state.term,
      this.state.definition,
      this.state.courseName
    );
  }

  render() {
    const { courseName } = this.state;
    const { open, handleClose, courses } = this.props;
    const menuItems = courses.map((course) => (
      <MenuItem value={course.title} key={course._id}>
        {course.title}
      </MenuItem>
    ));
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
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
              name='courseName'
              value={courseName}
              onChange={this.handleChange}
              fullWidth
            >
              {menuItems}
            </Select>
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
      </div>
    );
  }
}

export default NewDefinition;
