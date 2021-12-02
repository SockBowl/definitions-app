import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Search from './Search';
import ListDefs from './ListDefs';
import NotFound from './NotFound';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      updateDefs: false
    };
    this.getCourses = this.getCourses.bind(this);
    this.setUpdateDefsTrue = this.setUpdateDefsTrue.bind(this);
    this.setUpdateDefsFalse = this.setUpdateDefsFalse.bind(this);
    this.handleNewDefinition = this.handleNewDefinition.bind(this);
    this.handleNewCourse = this.handleNewCourse.bind(this);
  }

  componentDidMount() {
    this.getCourses();
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
    } catch (err) {
      console.log(err);
    }
    this.setUpdateDefsTrue();
  }

  async handleNewCourse(title) {
    try {
      await axios.post('http://localhost:5000/courses', { title });
    } catch (err) {
      console.log(err);
    }
    this.getCourses();
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

  render() {
    const { courses, updateDefs } = this.state;
    return (
      <Nav
        courses={courses}
        setUpdateDefsTrue={this.setUpdateDefsTrue}
        getCourses={this.getCourses}
        handleNewDefinition={this.handleNewDefinition}
        handleNewCourse={this.handleNewCourse}
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
              />
            )}
          />
          {courses.map((course) => {
            const path = course.title.replace(/\s+/g, '');
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
                  />
                )}
                key={course._id}
              />
            );
          })}
          <Route render={() => <NotFound />} />
        </Switch>
      </Nav>
    );
  }
}

export default App;
