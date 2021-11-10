import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';

import NewDefinition from './NewDefinition';
import NewCourse from './NewCourse';

import axios from 'axios';

//icons
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';

//styling
import styles from './styles/NavStyles.js';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      openMenu: false,
      openAddDef: false,
      openAddCourse: false,
      anchorElement: null
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.openAddMenu = this.openAddMenu.bind(this);
    this.closeAddMenu = this.closeAddMenu.bind(this);
    this.openAddDefDialog = this.openAddDefDialog.bind(this);
    this.closeAddDefDialog = this.closeAddDefDialog.bind(this);
    this.handleNewDefinition = this.handleNewDefinition.bind(this);
    this.openAddCourseDialog = this.openAddCourseDialog.bind(this);
    this.closeAddCourseDialog = this.closeAddCourseDialog.bind(this);
    this.handleNewCourse = this.handleNewCourse.bind(this);
  }

  async handleNewDefinition(term, definition, course) {
    try {
      await axios.post('http://localhost:5000/alldefinitions', {
        term,
        definition,
        course: course._id
      });
    } catch (err) {
      console.log(err);
    }
    // a very janky way of re-rendering ListDefs.js when adding a new definition.
    // function is passed from App.js
    this.props.setUpdateDefsTrue();
  }

  async handleNewCourse(title) {
    try {
      await axios.post('http://localhost:5000/allcourses', { title });
    } catch (err) {
      console.log(err);
    }
    this.props.getCourses();
  }

  toggleDrawer() {
    this.setState((st) => {
      return { openDrawer: !st.openDrawer };
    });
  }

  openAddMenu(evt) {
    this.setState({ anchorElement: evt.currentTarget, openMenu: true });
  }

  closeAddMenu() {
    this.setState({ anchorElement: null, openMenu: false });
  }

  openAddDefDialog() {
    this.setState({ openAddDef: true, openMenu: false });
  }

  closeAddDefDialog() {
    this.setState({ openAddDef: false });
  }

  openAddCourseDialog() {
    this.setState({ openAddCourse: true, openMenu: false });
  }

  closeAddCourseDialog() {
    this.setState({ openAddCourse: false });
  }

  render() {
    const { classes, children, courses } = this.props;
    const { openDrawer, openMenu, openAddDef, openAddCourse, anchorElement } =
      this.state;

    const displayCourses = courses.map((course) => {
      const title = course.title.replace(/\s+/g, '');
      return (
        <ListItem button component={Link} to={`/${title}`} key={course._id}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary={course.title} />
        </ListItem>
      );
    });

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: openDrawer
          })}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={this.toggleDrawer}
              edge='start'
              className={clsx(classes.menuButton, openDrawer && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title} noWrap>
              Show More
            </Typography>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={this.openAddMenu}
              color='inherit'
            >
              <AddIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElement}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={openMenu}
              onClose={this.closeAddMenu}
            >
              <MenuItem onClick={this.openAddDefDialog}>
                Add new definition
              </MenuItem>
              <MenuItem onClick={this.openAddCourseDialog}>
                Add new course
              </MenuItem>
            </Menu>
            <NewDefinition
              open={openAddDef}
              handleClose={this.closeAddDefDialog}
              handleAdd={this.handleNewDefinition}
              courses={courses}
            />
            <NewCourse
              open={openAddCourse}
              handleClose={this.closeAddCourseDialog}
              handleNewCourse={this.handleNewCourse}
            />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={openDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component={Link} to={'/AllDefinitions'}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary={'All Definitions'} />
            </ListItem>
            {displayCourses}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: openDrawer
          })}
        >
          <div className={classes.drawerHeader} />
          <Container maxWidth='md'>{children}</Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Nav);
