import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { AppBar, Container, Toolbar } from '@material-ui/core';
import { Dashboard } from './Dashboard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5)
  }
}))

export default function Main() {
  const classes = useStyles();

  return (
    <Router>
      <AppBar position='static'>
        <Toolbar>
          Image Manager
        </Toolbar>
      </AppBar>
      <Container className={classes.root}>
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </Container>
    </Router>
  )
}
