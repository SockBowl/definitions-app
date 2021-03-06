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
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import NewDefinition from './NewDefinition';
import NewCourse from './NewCourse';

//icons
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

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
    this.openAddCourseDialog = this.openAddCourseDialog.bind(this);
    this.closeAddCourseDialog = this.closeAddCourseDialog.bind(this);
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
    const { classes, children, courses, handleNewDefinition, handleNewCourse } =
      this.props;
    const { openDrawer, openMenu, openAddDef, openAddCourse, anchorElement } =
      this.state;

    const displayCourses = courses.map((course) => {
      const path = course.title.replace(/\s+/g, '');
      if (
        course.title.toLowerCase() === 'unassigned' &&
        course.definitions.length === 0
      ) {
        return '';
      }
      return (
        <ListItem button component={Link} to={`/${path}`} key={course._id}>
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
              <Button
                color='inherit'
                startIcon={<HomeRoundedIcon />}
                component={Link}
                to={'/'}
              >
                Home
              </Button>
            </Typography>
            <IconButton
              aria-label='add button'
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
              handleAdd={handleNewDefinition}
              courses={courses}
            />
            <NewCourse
              open={openAddCourse}
              handleClose={this.closeAddCourseDialog}
              handleNewCourse={handleNewCourse}
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
          <Container>{children}</Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Nav);
