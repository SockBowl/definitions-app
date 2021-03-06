import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Definition from './Definition';
import EditCourse from './EditCourse';
import DeleteDialog from './DeleteDialog';

//icons
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

//styles
import styles from './styles/ListDefsStyles';

class ListDefs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      definitions: [],
      courseId: this.props.id,
      openEditModal: false,
      openDeleteDialog: false
    };
    this.getDefinitions = this.getDefinitions.bind(this);
    this.toggleOpenDelete = this.toggleOpenDelete.bind(this);
    this.toggleOpenEdit = this.toggleOpenEdit.bind(this);
    this.handleCourseUpdate = this.handleCourseUpdate.bind(this);
    this.handleCourseDelete = this.handleCourseDelete.bind(this);
  }

  componentDidMount() {
    this.getDefinitions();
  }

  componentDidUpdate() {
    if (this.props.updateDefs) {
      this.getDefinitions();
      this.props.setUpdateDefsFalse();
    }
  }

  async getDefinitions() {
    const { courseId } = this.state;
    let response;
    try {
      if (courseId === 'alldefs') {
        response = await axios.get('http://localhost:5000/definitions');
      } else {
        response = await axios.get(`http://localhost:5000/courses/${courseId}`);
      }
      this.setState({ definitions: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  //Replaces title in the db then replaces the browser history so the url is consistent with the new title.
  //uses regex to remove whitespace for url.
  async handleCourseUpdate(title) {
    const { courseId } = this.state;
    try {
      const res = await axios.put(`http://localhost:5000/courses/${courseId}`, {
        title
      });
      console.log(res);
      this.props.getCourses();
      this.props.snackAlert('success', 'Course title was updated!');
      this.props.history.replace(title.replace(/\s/g, ''), true);
    } catch (err) {
      this.props.snackAlert('error', 'Uh oh, something went wrong!');
      // console.log(err);
    }
  }

  async handleCourseDelete(id) {
    try {
      await axios.delete(`http://localhost:5000/courses/${id}`);
      this.props.getCourses();
      this.props.snackAlert('warning', 'Course was deleted!');
      this.props.history.replace('/', true);
    } catch (err) {
      this.props.snackAlert('error', 'Uh oh, something went wrong!');
      // console.log(err);
    }
  }

  toggleOpenEdit() {
    this.setState((st) => {
      return { openEditModal: !st.openEditModal };
    });
  }

  toggleOpenDelete() {
    this.setState((st) => {
      return { openDeleteDialog: !st.openDeleteDialog };
    });
  }

  render() {
    const { definitions, courseId, openEditModal, openDeleteDialog } =
      this.state;
    const { courseTitle, courses, classes, snackAlert } = this.props;
    const allDefinitions = definitions.map((def) => (
      <Definition
        def={def}
        courseId={courseId}
        key={def._id}
        getDefinitions={this.getDefinitions}
        courses={courses}
        snackAlert={snackAlert}
      />
    ));
    return (
      <div>
        <Typography className={classes.title} variant='h2' gutterBottom>
          {courseTitle}
          <IconButton
            className={classes.iconButton}
            aria-label='edit course title'
            size='small'
            onClick={this.toggleOpenEdit}
            disabled={courseTitle.toLowerCase() === 'unassigned'}
          >
            <EditRoundedIcon />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            aria-label='delete course'
            size='small'
            onClick={this.toggleOpenDelete}
          >
            <DeleteRoundedIcon />
          </IconButton>
        </Typography>
        {allDefinitions}
        <EditCourse
          open={openEditModal}
          handleClose={this.toggleOpenEdit}
          handleCourseUpdate={this.handleCourseUpdate}
          courseTitle={courseTitle}
        />
        <DeleteDialog
          open={openDeleteDialog}
          toggleOpen={this.toggleOpenDelete}
          term={courseTitle}
          id={courseId}
          handleConfirm={this.handleCourseDelete}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(ListDefs));
