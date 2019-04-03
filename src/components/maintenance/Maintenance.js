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
import CompleteMaintenanceFragment from "./CompleteMaintenanceForm"


export default class Maintenance extends Component {

    componentDidMount() {


    }

    addMaint(maintObject) {

        ResourceManager.addNewItem("maintenance, maintObject")
            .then(() => ResourceManager.getAllItems("maintenance"))
            .then(maint => this.setState({ maintenance: maint }))
    }




    constructor() {
        super();
        this.state = {
            visible: false,
            activeUser: parseInt(sessionStorage.getItem("credentials")),
            location: "",
            description: "",
            date: "",
            updatedDescription: "",
            hazard: "",
            checked: false,
            phone: "",
            maintId:""
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.completeMaint = this.completeMaint.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onHide = this.onHide.bind(this);
    }
    onClick(event) {
        this.setState({ visible: true });
    }

    onHide(event) {
        this.setState({ visible: false });
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
            description: this.state.description,
            dateSubmitted: new Date()

        }


        // post it to the database
        this.props.addMaint("maintenance", maintObject)
        this.props.history.push("/maintenance")
    }


    completeMaint() {
        // get the id of the target maintenance_request object
        const maintId = parseInt(this.state.maintId.split("-")[1])
        // create a patch object from info in popup
        const maintObject = CompleteMaintenance(this.state.description, this.state.date)
        // patch the maintenance_request with the submitted information
        this.props.patchMaint("maintenance", maintId, maintObject)


    }

    basicUser() {
        return (
            <React.Fragment>

                <div className="maint-cont">

                    <div className="maint-req-form">
                        <h2 className="maint-req-header">Report a Maintenance or Trail Issue</h2>
                        <div>
                            <InputText value={this.state.location} onChange={this.onChange}
                                name="location"
                                placeholder="Enter approx. mile mark">

                            </InputText>
                        </div>

                        <div >
                            <Dropdown
                                className="haz-dd" value={this.state.hazard.id}
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
                            {this.props.maintenance.map(m =>
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
                        {this.props.maintenance.filter((request) => request.isComplete === false && request.userId === this.props.activeUser).map(m =>

                            <div><Checkbox id={`checkbox-${m.id}`}  onChange={(e) => this.setState({ visible: true, maintId:e.target.id })}></Checkbox>
                                <a href={`/maintenance/${m.id}`}> mile {m.mile}--{m.description}</a></div>

                        )}
                    </div>
                    <div className="maint-unassigned">
                        <h2>unassigned/assigned to others</h2>
                        {this.props.maintenance.filter((request) => request.isComplete === false && request.userId !== this.props.activeUser).map(m =>
                            <div><a href={`/maintenance/${m.id}`}> mile {m.mile}--{m.description}</a></div>
                        )}
                    </div>
                    <div className="maint-complete">
                        <h2>complete</h2>
                        {this.props.maintenance.filter((request) => request.isComplete === true).map(m =>
                            <div><Checkbox checked="checked"></Checkbox>
                                <a href={`/maintenance/${m.id}`}> mile {m.mile}--{m.description}</a></div>

                        )}
                    </div>
                </div>

            </React.Fragment>


        )
    }


    render() {
        const footer = (
            <div>
                <Button label="Submit" className="p-button-success" icon="pi pi-check"
                    onClick={() => {
                        this.onHide()
                        this.completeMaint()
                    }}
                />
            </div>
        )
        return (
            <React.Fragment>

                {this.props.user.isAdmin === false ? this.basicUser() : this.adminUser()}
                {CompleteMaintenanceFragment(footer, this.state, this.onChange, this.onHide)}

            </React.Fragment>
        )
    }
}