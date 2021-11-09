import React, { Component } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getDefs = this.getDefs.bind(this);
    this.state = {
      searchItem: '',
      returnedItems: []
    };
  }

  async getDefs() {
    try {
      let res = await axios.get(
        `http://localhost:5000/search?term=${this.state.searchItem}`
      );
      this.setState({ returnedItems: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange(evt) {
    this.setState({ searchItem: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.getDefs();
    this.setState({ searchItem: '' });
  }

  render() {
    const definitions = this.state.returnedItems.map((def) => (
      <Card key={def._id}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {def.term}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {def.definition}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>Edit</Button>
          <Button size='small'>Delete</Button>
        </CardActions>
      </Card>
    ));
    return (
      <div>
        <h1>Search for the things</h1>
        <Box component='form'>
          <TextField
            size='small'
            id='outlined-basic'
            variant='outlined'
            type='text'
            value={this.state.searchItem}
            onChange={this.handleChange}
          />
          <Button variant='contained' size='medium' onClick={this.handleSubmit}>
            Search
          </Button>
        </Box>
        {definitions}
      </div>
    );
  }
}
