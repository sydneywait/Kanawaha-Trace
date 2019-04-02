import React, { Component } from "react";
import "./Maintenance.css"
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask'
import ResourceManager from "../../modules/ResourceAPIManager"
import CompleteMaintenance from "./CompleteMaintenance"


export default class Maintenance extends Component {

    componentDidMount() {

        let newState = {}

        ResourceManager.getAllItems("maintenance_requests")
            .then((m) => {
                newState.maintenance = m
                this.setState(newState)
            })

    }

    addMaint(maintObject) {

        ResourceManager.addNewItem("maintenance_requests", maintObject)
            .then(() => ResourceManager.getAllItems("maintenance_requests"))
            .then(maint => this.setState({ maintenance: maint }))
    }


    state = {
        maintenance: []
    }

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
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onComplete = this.onComplete.bind(this)
        // this.onHide = this.onHide.bind(this);
    }

    onChange(e) {
        const stateToChange = {}
        stateToChange[e.target.name] = e.target.value
        this.setState(stateToChange)
    }

    handleSubmit() {
        // create an object representing the request

        const maintObject = {
            mile: this.state.location,
            hazardId: this.state.hazard.id,
            submittedBy: this.state.activeUser,
            isComplete: false,
            userId: "",
            okToContact: this.state.checked,
            phone: this.state.phone,
            description: this.state.description

        }
        console.log(maintObject)


        // post it to the database
        this.props.addMaint("maintenance_requests", maintObject)
        this.props.history.push("/maintenance")
    }


    onComplete(){


    }

    basicUser() {
        return (
            <React.Fragment>

                <div className="maint-cont">

                    <div className="maint-req-form">
                        <h2 className="maint-req-header">Report a Maintenance or Trail Issue</h2>
                        <div>
                            <InputText value={this.state.location} onChange={(e) => this.setState({ location: e.target.value })}
                                placeholder="Enter approx. mile mark">
                            </InputText>
                        </div>

                        <div >
                            <Dropdown
                                className="haz-dd" value={this.state.hazard}
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
                                onChange={e => this.setState({ checked: e.checked })} checked={this.state.checked}>
                            </Checkbox>
                            <label htmlFor="contact-check" style={{ wordBreak: "break-word" }} >
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
                    <div>
                        <div className="maint-req-list">
                            <h2 className="maint-req-header">Ongoing Maintenance</h2>
                            {this.props.maintenance_requests.map(m =>
                                <p>mile {m.mile}--{m.description}</p>

                            )}
                        </div>
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
                        <h2>assigned to me</h2>
                        {this.props.maintenance_requests.filter((request) => request.isComplete === false&&request.userId===this.props.activeUser).map(m =>

                                <div><Checkbox checked="" onChange={()=>this.onComplete}></Checkbox>
                                <a href ={`/maintenance/${m.id}`}> mile {m.mile}--{m.description}</a></div>

                            )}
                    </div>
                    <div className="maint-unassigned">
                    <h2>unassigned/assigned to others</h2>
                        {this.props.maintenance_requests.filter((request) => request.isComplete === false&&request.userId!==this.props.activeUser).map(m =>
                            <div><a href ={`/maintenance/${m.id}`}> mile {m.mile}--{m.description}</a></div>
                        )}
                        </div>
                    <div className="maint-complete">
                        <h2>complete</h2>
                        {this.props.maintenance_requests.filter((request) => request.isComplete === true).map(m =>
                                <div><Checkbox checked="checked"></Checkbox>
                                <a href ={`/maintenance/${m.id}`}> mile {m.mile}--{m.description}</a></div>

                            )}
                    </div>
                </div>

            </React.Fragment>


        )
    }


    render() {
        return (
            <React.Fragment>

                {this.props.user.isAdmin === false ? this.basicUser() : this.adminUser()}


            </React.Fragment>
        )
    }
}