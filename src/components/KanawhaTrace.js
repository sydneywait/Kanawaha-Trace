import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";



export default class KanawhaTrace extends Component {
render() {
    return (
      <React.Fragment>
        <NavBar/>
        <ApplicationViews />
      </React.Fragment>
    );
  }
}
