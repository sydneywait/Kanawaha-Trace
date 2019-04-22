import React, { Component } from "react";
import "./KanawhaTrace.css"
export default class HomePage extends Component {




    render() {



        return (
            <React.Fragment>
                <div className="home-container">
                    <div className="home-sidebar">
                    </div>
                    <div className="home-body">
                        <h1 className="home-page-title">The Kanawha Trace</h1>
                        <p className="home-page-intro">The Kanawha Trace is an approximately 32-mile foot trail running from Barboursville, WV, at the confluence of the Mud and Guyandotte Rivers, to Frazier's Bottom, WV on the Kanawha River. With the exception of public roads, the trail is located in its entirety on private property. Without the cooperation of these land owners there would be no Kanawha Trace. When hiking the trail please respect the property and interests of these gracious people.</p>

                        <p className="home-page-intro">The Kanawha Trace begins at the ford crossing of the Mud River on the route of the old James and Kanawha River Turnpike. Today it is known as Merritts Creek Road near Barboursville. The Kanawha Trace runs through 3 counties in West Virginia (Cabell, Mason, Putnam county) and was built and is currently maintained by a local Boy Scout Troop 42 of the Tri-State Area Council. The trail was opened in 1962 and in 2017 we celebrated the 55th Anniversary with more than 100 hikers hiking across all 32 miles.</p>
                    </div>

                </div>

            </React.Fragment>
        )
    }
}