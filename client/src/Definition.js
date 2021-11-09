import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import DeleteDialog from './DeleteDialog';
import EditDefinition from './EditDefinition';

//styling
import styles from './styles/DefinitionStyles';

class Definition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      openEditModal: false
    };
    this.toggleOpenDelete = this.toggleOpenDelete.bind(this);
    this.toggleOpenEdit = this.toggleOpenEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {}

  toggleOpenDelete() {
    this.setState((st) => {
      return { openDeleteDialog: !st.openDeleteDialog };
    });
  }

  toggleOpenEdit() {
    this.setState((st) => {
      return { openEditModal: !st.openEditModal };
    });
  }

  async handleDelete(id) {
    try {
      await axios.delete(`http://localhost:5000/alldefinitions/${id}`);
      this.toggleOpenDelete();
      this.props.getDefinitions(this.props.courseId);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { id, term, definition, courses, classes } = this.props;
    const { openDeleteDialog, openEditModal } = this.state;
    return (
      <React.Fragment>
        <Card className={classes.root}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {term}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {definition}
            </Typography>
          </CardContent>
          <CardActions className={classes.buttons}>
            <Button onClick={this.openEditModal} size='small' color='primary'>
              Edit
            </Button>
            <Button
              onClick={this.toggleOpenDelete}
              size='small'
              color='primary'
            >
              Delete
            </Button>
          </CardActions>
        </Card>
        <DeleteDialog
          open={openDeleteDialog}
          toggleOpen={this.toggleOpenDelete}
          term={term}
          id={id}
          handleConfirm={this.handleDelete}
        />
        <EditDefinition
          open={openEditModal}
          handleClose={this.toggleOpenEdit}
          term={term}
          definition={definition}
          id={id}
          courses={courses}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Definition);