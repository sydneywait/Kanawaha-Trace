import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BuildIcon from '@material-ui/icons/Build';
import RouteIcon from '@material-ui/icons/Terrain';
import ExploreIcon from '@material-ui/icons/MyLocation';
import LogoutIcon from '@material-ui/icons/PersonOutline'



const styles = {
  root: {
    flexGrow: 1,
    maxWidth: "100%"
  },
};

class IconLabelTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Paper square className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<ExploreIcon />} label="EXPLORE"   to ="/explore" component ={Link}/>
          <Tab icon={<RouteIcon />} label="ROUTES" to ="/routes" component ={Link} />
          <Tab icon={<BuildIcon />} label="MAINTENANCE" to ="/maintenance" component ={Link}/>
          <Tab icon={<LogoutIcon />} label="LOGOUT" />
        </Tabs>
      </Paper>

    );
  }
}

IconLabelTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelTabs);
