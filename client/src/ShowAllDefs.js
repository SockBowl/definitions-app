import React, { Component } from 'react';
import axios from 'axios';
import Definition from './Definition';

export default class ShowAllDefs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      definitions: []
    };
    this.deleteDefinition = this.deleteDefinition.bind(this);
    this.getData = this.getData.bind(this);
  }

  async getData() {
    try {
      let defs = await axios.get('http://localhost:5000/alldefinitions');
      this.setState(() => ({
        isLoaded: true,
        definitions: defs.data
      }));
      console.log(defs);
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    this.getData();
  }

  async deleteDefinition(id) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/alldefinitions/${id}`
      );
      this.getData();
    } catch (err) {
      console.log(err);
    }
  }

  async updateDefinition(id, updatedTerm, updatedDef) {
    try {
      const response = await axios.put(
        `http://localhost:5000/alldefinitions/${id}`,
        { term: updatedTerm, definition: updatedDef }
      );
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const definitions = this.state.definitions.map((def) => (
      <Definition
        term={def.term}
        definition={def.definition}
        id={def._id}
        updateDefinition={this.updateDefinition}
        deleteDefinition={this.deleteDefinition}
        key={def._id}
      />
    ));
    return (
      <div>
        <h1>All Definitions</h1>
        <div>{definitions}</div>
      </div>
    );
  }
}
