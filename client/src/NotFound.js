import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from './styles/NotFoundStyles';

class NotFound extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.title} variant='h1'>
          404
        </Typography>
        <Typography variant='h4'>Page Not Found</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(NotFound);
