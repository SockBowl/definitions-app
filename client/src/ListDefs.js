import React, { Component } from 'react';
import axios from 'axios';
import Definition from './Definition';

class ListDefs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      definitions: [],
      courseId: this.props.id
    };
    this.getDefinitions = this.getDefinitions.bind(this);
  }

  componentDidMount() {
    this.getDefinitions();
  }

  componentDidUpdate() {
    //a very janky way of re-rendering listdefs when adding a new definition.
    //function is passed from App.js
    if (this.props.updateDefs) {
      this.getDefinitions();
      this.props.setUpdateDefsFalse();
    }
  }

  async getDefinitions() {
    const { courseId } = this.state;
    try {
      if (courseId === undefined) {
        const response = await axios.get(
          'http://localhost:5000/alldefinitions'
        );
        this.setState({ definitions: response.data });
      } else {
        const response = await axios.get(
          `http://localhost:5000/courses/${courseId}`
        );
        this.setState({ definitions: response.data });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { definitions, courseId } = this.state;
    const { courseTitle, courses } = this.props;
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
        <h1>{courseTitle}</h1>
        {allDefinitions}
      </div>
    );
  }
}

export default ListDefs;
