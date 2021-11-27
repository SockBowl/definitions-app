import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Definition from './Definition';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditCourse from './EditCourse';

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
      openDeleteModal: false
    };
    this.getDefinitions = this.getDefinitions.bind(this);
    this.toggleOpenDelete = this.toggleOpenDelete.bind(this);
    this.toggleOpenEdit = this.toggleOpenEdit.bind(this);
    this.handleCourseUpdate = this.handleCourseUpdate.bind(this);
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
        response = await axios.get('http://localhost:5000/alldefinitions');
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
    console.log(this.props.history);
    const { courseId } = this.state;
    try {
      await axios.put(`http://localhost:5000/allcourses/${courseId}`, {
        title
      });
    } catch (err) {
      console.log(err);
    }
    this.props.getCourses();
    this.props.history.replace(title.replace(/\s/g, ''), true);
  }

  toggleOpenEdit() {
    this.setState((st) => {
      return { openEditModal: !st.openEditModal };
    });
  }

  toggleOpenDelete() {
    this.setState((st) => {
      return { openDeleteModal: !st.openDeleteModal };
    });
  }

  render() {
    const { definitions, courseId, openEditModal } = this.state;
    const { courseTitle, courses, classes } = this.props;
    const allDefinitions = definitions.map((def) => (
      <Definition
        def={def}
        courseId={courseId}
        key={def._id}
        getDefinitions={this.getDefinitions}
        courses={courses}
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
          >
            <EditRoundedIcon />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            aria-label='delete course'
            size='small'
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
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(ListDefs));
