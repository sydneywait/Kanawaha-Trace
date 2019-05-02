import React, { Component } from "react";
import { Dropdown } from 'primereact/dropdown';
import ResourceAPIManager from "../../modules/ResourceAPIManager"



export default class Admin extends Component {

    componentDidMount() {
        const newState = {}
        ResourceAPIManager.getAllItems("users")
            .then(users => {
                newState.users = users
                this.setState(newState)
            }
            )


    }

    constructor() {
        super();
        this.state = {
            users: [],
            select1: "",
            select2:""

        };
        this.onStartChange = this.onStartChange.bind(this);
    }

    onStartChange(e) {

        this.setState({ start: e.value });
    }


    render() {
        var Admins = this.state.users.filter(user => user.isAdmin === true)
        var nonAdmins = this.state.users.filter(user => user.isAdmin === false)


        return (


            <React.Fragment>

                <div>This is the header</div>
                <div>Remove Admin Credentials<Dropdown className="exp-dd"
                    value={this.state.select1}
                    options={Admins}
                    onChange={this.onStartChange}
                    style={{ width: '300px' }} placeholder="Select a User" optionLabel="name" />
                </div>
                <div>Give Admin Credentials<Dropdown className="exp-dd"
                    value={this.state.select2}
                    options={nonAdmins}
                    onChange={this.onStartChange}
                    style={{ width: '300px' }} placeholder="Select a User" optionLabel="name" />
                </div>

            </React.Fragment>

        )

    }

}
