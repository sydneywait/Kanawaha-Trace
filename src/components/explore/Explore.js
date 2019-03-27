import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });
class Explore extends Component{
    state = {
        start: "",
        end: "",
        labelWidth: 100,
      };
      componentDidMount() {
        this.setState({
        //   labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
      }

      handleChange = start => event => {
        this.setState({ [start]: event.target.value });
      };



    render (){
        const { classes } = this.props;
        return (
<FormControl className={classes.formControl}>

          <InputLabel htmlFor="start-native-helper">Start Point</InputLabel>
          <NativeSelect
            value={this.state.start}
            onChange={this.handleChange('start')}
            input={<Input name="start" id="start-native-helper" />}
          >
            <option value="" />
            <option value={1}>First</option>
            <option value={2}>Second</option>
            <option value={3}>Third</option>
          </NativeSelect>
          <FormHelperText>Select a start point</FormHelperText>
        </FormControl>


        )
    }

}

Explore.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(Explore);