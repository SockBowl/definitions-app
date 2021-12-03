import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Nav from './Nav';
import Search from './Search';
import ListDefs from './ListDefs';
import NotFound from './NotFound';
import axios from 'axios';

//styles
import styles from './styles/AppStyles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      updateDefs: false,
      updateCourses: false,
      alert: false,
      alertSeverity: '',
      alertMessage: ''
    };
    this.getCourses = this.getCourses.bind(this);
    this.setUpdateDefsTrue = this.setUpdateDefsTrue.bind(this);
    this.setUpdateDefsFalse = this.setUpdateDefsFalse.bind(this);
    this.handleNewDefinition = this.handleNewDefinition.bind(this);
    this.handleNewCourse = this.handleNewCourse.bind(this);
    this.openAlert = this.openAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  componentDidMount() {
    this.getCourses();
  }

  componentDidUpdate() {
    if (this.state.updateCourses) {
      this.getCourses();
      this.setState({ updateCourses: false });
    }
  }

  async getCourses() {
    try {
      let response = await axios.get('http://localhost:5000/courses');
      this.setState(() => ({
        courses: [...response.data]
      }));
    } catch (err) {
      console.log(err);
    }
  }

  async handleNewDefinition(term, definition, course) {
    try {
      await axios.post('http://localhost:5000/definitions', {
        term,
        definition,
        course: course._id
      });
      this.openAlert('success', 'New definition was added!');
      this.setUpdateDefsTrue();
    } catch (err) {
      this.openAlert('error', 'Uh oh, something went wrong!');
      // console.log(err);
    }
  }

  async handleNewCourse(title) {
    try {
      await axios.post('http://localhost:5000/courses', { title });
      this.openAlert('success', 'New course was added!');
      this.getCourses();
    } catch (err) {
      this.openAlert('error', 'Uh oh, something went wrong!');
      // console.log(err);
    }
  }

  //Using the state to re-render list defs when a new definition is added
  //This function is passed to Nav.js
  //When a new definition is added the state is changed to true from Nav.js
  //ListDefs.js will then re-render and set the state to false from componenetDidUpdate using setUpdateDefsFalse
  setUpdateDefsTrue() {
    this.setState({ updateDefs: true });
  }

  //Because Nav.js can't access specific children this function is passed to ListDefs.js
  //When a new definition is added the state is changed to true from Nav.js
  //ListDefs.js will then re-render and set the state to false from componenetDidUpdate using setUpdateDefsFalse
  setUpdateDefsFalse() {
    this.setState({ updateDefs: false });
  }

  updateCourses() {
    this.setState({ updateCourses: true });
  }

  openAlert(severity, message) {
    this.setState({
      alert: true,
      alertSeverity: severity,
      alertMessage: message
    });
  }

  closeAlert() {
    this.setState({ alert: false });
  }

  render() {
    const { classes } = this.props;
    const { courses, updateDefs, alert, alertSeverity, alertMessage } =
      this.state;
    return (
      <div className={classes.root}>
        <Nav
          courses={courses}
          setUpdateDefsTrue={this.setUpdateDefsTrue}
          getCourses={this.getCourses}
          handleNewDefinition={this.handleNewDefinition}
          handleNewCourse={this.handleNewCourse}
          snackAlert={this.openAlert}
        >
          <Switch>
            <Route exact path='/' render={() => <Search courses={courses} />} />
            <Route
              exact
              path='/AllDefinitions'
              render={() => (
                <ListDefs
                  courseTitle={'All Definitions'}
                  id={'alldefs'}
                  updateDefs={updateDefs}
                  setUpdateDefsFalse={this.setUpdateDefsFalse}
                  courses={courses}
                  getCourses={this.getCourses}
                  snackAlert={this.openAlert}
                />
              )}
            />
            {courses.map((course) => {
              const path = course.title.replace(/\s+/g, '');
              if (
                course.title.toLowerCase() === 'unassigned' &&
                course.definitions.length === 0
              ) {
                return '';
              }
              return (
                <Route
                  exact
                  path={`/${path}`}
                  render={() => (
                    <ListDefs
                      id={course._id}
                      courseTitle={course.title}
                      updateDefs={updateDefs}
                      setUpdateDefsFalse={this.setUpdateDefsFalse}
                      courses={courses}
                      getCourses={this.getCourses}
                      snackAlert={this.openAlert}
                    />
                  )}
                  key={course._id}
                />
              );
            })}
            <Route render={() => <NotFound />} />
          </Switch>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            open={alert}
            autoHideDuration={6000}
            onClose={this.closeAlert}
          >
            <Alert
              elevation={6}
              variant='filled'
              className={classes.alert}
              onClose={this.closeAlert}
              severity={alertSeverity}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </Nav>
      </div>
    );
  }
}

export default withStyles(styles)(App);
