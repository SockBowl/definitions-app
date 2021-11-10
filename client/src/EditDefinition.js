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

class EditDefinition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: this.props.def.term,
      definition: this.props.def.definition,
      course: JSON.stringify({
        title: this.props.def.course.title,
        _id: this.props.def.course._id
      }),
      oldCourse: this.props.def.course
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  //handleClose and handleUpdate have both been passed by Definition.js
  handleSave() {
    this.props.handleClose();
    this.props.handleUpdate(
      this.props.def._id,
      this.state.term,
      this.state.definition,
      JSON.parse(this.state.course),
      this.state.oldCourse
    );
  }

  render() {
    const { course, term, definition } = this.state;
    const { open, handleClose, courses } = this.props;
    const menuItems = courses.map((course) => (
      <MenuItem
        value={JSON.stringify({ title: course.title, _id: course._id })}
        key={course._id}
      >
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
              value={term}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin='dense'
              id='definition'
              name='definition'
              label='Definition'
              type='text'
              value={definition}
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
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleSave} color='primary'>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditDefinition;
