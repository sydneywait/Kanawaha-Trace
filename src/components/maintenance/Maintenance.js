import React, { Component } from "react";
import "./Maintenance.css"
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask'

export default class Maintenance extends Component {

    constructor() {
        super();
        this.state = {
            visible: false,
            activeUser: parseInt(sessionStorage.getItem("credentials")),
            location: "",
            description: "",
            hazard: "",
            checked: false,
            phone: ""
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this)
        // this.onHide = this.onHide.bind(this);
    }

    onChange(e) {
        const stateToChange = {}
        stateToChange[e.target.name] = e.target.value
        this.setState(stateToChange)
    }

    handleSubmit(){
// create an object representing the request


// post it to the database



    }
    basicUser() {
        return (
            <React.Fragment>

                <div className="maint-cont">
                    <div className="maint-req-form">
                        <div>
                            <InputText value={this.state.location} onChange={(e) => this.setState({ location: e.target.value })}
                                placeholder="Enter approx. mile mark">
                            </InputText>
                        </div>

                        <div >
                            <Dropdown
                                className="haz-dd" value={this.state.hazardId}
                                name="hazard"
                                options={this.props.hazards.map(h => h)}
                                onChange={this.onChange}
                                style={{ width: '200px' }}
                                placeholder="Select a hazard type" optionLabel="type">
                            </Dropdown>
                        </div>

                        <div>
                            <InputTextarea placeholder="enter a brief description of the issue"
                                rows={5} cols={30}
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                                autoResize={true}>
                            </InputTextarea>
                        </div>

                        <div>
                            <Checkbox id="contact-check"
                                name="checked"
                                value={this.state.checked}
                                onChange={e => this.setState({checked: e.checked})} checked={this.state.checked}>
                            </Checkbox>
                            <label htmlFor="contact-check">
                                Is it ok to follow up with you about this issue if more information is needed?</label>
                        </div>

                        {this.state.checked === true ?
                            <div><InputMask mask="999-999-9999"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.onChange}
                                placeholder="enter phone number">
                            </InputMask></div> :
                            ""}


                        <div><Button label="Submit"
                            icon="pi pi-check" iconPos="right"
                            className="p-button-raised p-button-rounded p-button-success"
                            type="submit"
                            onClick={this.handleSubmit}
                            >

                            </Button>
                        </div>

                    </div>
                    <div className="maint-req-list">
                        list
                    </div>
                </div>

            </React.Fragment>
        )
    }

    adminUser() {
        return (
            <React.Fragment>

                <div className="maint-cont">
                    <div className="maint-assigned">
                        assigned
                    </div>
                    <div className="maint-unassigned">
                        list
                    </div>
                    <div className="maint-complete">
                        complete
                    </div>
                </div>

            </React.Fragment>


        )
    }


    render() {
        return (
            <React.Fragment>
                <h2>Report a Maintenance or Trail Issue</h2>
                {this.props.user.isAdmin === false ? this.basicUser() : this.adminUser()}


            </React.Fragment>
        )
    }
}