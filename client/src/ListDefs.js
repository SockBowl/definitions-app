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
