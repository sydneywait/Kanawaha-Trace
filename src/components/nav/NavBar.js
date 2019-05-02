import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import BuildIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';

import RouteIcon from '@material-ui/icons/Terrain';
import ExploreIcon from '@material-ui/icons/Explore';
import LoginIcon from '@material-ui/icons/LockOpen'
import LogoutIcon from '@material-ui/icons/PersonOutline'
import auth0Client from "../authentication/Auth";
import "./Nav.css"




const styles = {
  root: {
    flexGrow: 1,
    maxWidth: "100%"
  },
};

class NavBar extends React.Component {



  signOut = () => {
    auth0Client.signOut();
    sessionStorage.clear()
    this.props.history.replace("/");
  };
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  initialNav() {

    return (
      <React.Fragment>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
        <Tab icon={<HomeIcon />} label="HOME" to="/" component={Link} />
        <Tab icon={<LoginIcon />} label="LOGIN"  onClick={auth0Client.signIn}/>
        </Tabs>
      </React.Fragment>

    )
  }

  MainNav = () => {

    return (

      <React.Fragment>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
        <Tab icon={<HomeIcon />} label="HOME" to="/" component={Link} />
        <Tab icon={<ExploreIcon />} label="EXPLORE" to="/explore" component={Link} />
        <Tab icon={<RouteIcon />} label="MY ROUTES" to="/routes" component={Link} />
        <Tab icon={<BuildIcon />} label="MAINTENANCE" to="/maintenance" component={Link} />
        <Tab icon={<LogoutIcon />} label="LOGOUT" onClick={()=>{this.signOut()}} />
        </Tabs>
      </React.Fragment>
    )
  }

  render() {
    const { classes } = this.props;
    // const { value } = this.state;

    return (
      <Paper square className={classes.root}>

{auth0Client.isAuthenticated() ? this.MainNav():this.initialNav()}

      </Paper>

    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
