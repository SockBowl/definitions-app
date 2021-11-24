import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ListDefs from './ListDefs';

//styling
import styles from './styles/SearchStyles';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchTerm: '',
      search: false
    };
  }

  handleChange(evt) {
    this.setState({ searchTerm: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.setState({ search: true });
  }

  render() {
    const { classes, courses } = this.props;
    const { searchTerm, search } = this.state;
    return (
      <div className={classes.root}>
        <Box className={classes.formContainer} component='form'>
          <TextField
            className={classes.searchInput}
            InputProps={{ className: classes.input }}
            id='outlined-basic'
            variant='outlined'
            type='text'
            value={searchTerm}
            onChange={this.handleChange}
          />
          <Button
            className={classes.input}
            variant='contained'
            size='large'
            onClick={this.handleSubmit}
          >
            Search
          </Button>
        </Box>
        <div className={clsx({ [classes.listDefs]: search })}>
          {search && (
            <ListDefs id={'search'} courses={courses} searchTerm={searchTerm} />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Search);
