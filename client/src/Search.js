import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Definition from './Definition';

//styling
import styles from './styles/SearchStyles';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getDefs = this.getDefs.bind(this);

    this.state = {
      inputVal: '',
      searchTerm: '',
      definitions: [],
      search: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchTerm !== prevState.searchTerm) {
      this.getDefs(this.state.searchTerm);
    }
    if (this.state.searchTerm === '' && this.state.definitions.length !== 0) {
      this.setState({ definitions: [] });
    }
  }

  async getDefs(term) {
    const response = await axios.get(
      `http://localhost:5000/search?term=${term}`
    );
    this.setState({ definitions: response.data });
  }
  handleChange(evt) {
    this.setState({ inputVal: evt.target.value });
  }

  handleSubmit(evt) {
    this.setState({ searchTerm: evt.target.elements.searchInput.value });
    evt.preventDefault();
  }

  render() {
    const { classes, courses } = this.props;
    const { inputVal, definitions } = this.state;

    const defs = definitions.map((def) => (
      <Definition
        def={def}
        courseId={def.courseId}
        key={def._id}
        getDefinitions={this.getDefinitions}
        courses={courses}
      />
    ));

    return (
      <div className={classes.root}>
        <Box
          className={classes.formContainer}
          component='form'
          onSubmit={this.handleSubmit}
        >
          <TextField
            className={classes.searchInput}
            InputProps={{ className: classes.input }}
            id='outlined-basic'
            variant='outlined'
            type='text'
            value={inputVal}
            onChange={this.handleChange}
            name='searchInput'
          />
          <Button
            className={classes.input}
            variant='contained'
            size='large'
            type='submit'
            // onClick={this.handleSubmit}
          >
            Search
          </Button>
        </Box>
        <Container>
          <div className={classes.listDefs}>
            {/* {search && (
            <ListDefs id={'search'} courses={courses} searchTerm={searchTerm} />
          )} */}
            {defs}
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Search);
