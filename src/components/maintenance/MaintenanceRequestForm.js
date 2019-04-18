import React from "react"
import "./Maintenance.css"
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask'

const MaintenanceRequestForm = (state, props, onChange, onCheck, handleSubmit, handleError) => {

    return (
        <React.Fragment>
            <div className="maint-form-container">

                <div className="maint-req-header">{props.user.isAdmin === true ? "Create a new Ticket" : "Report any Trail Issues"}</div>
                <div className="maint-req-form-body">
                    <div>
                        {/* Enter the mile point */}
                        <InputText value={state.location} onChange={onChange}
                            name="location"
                            required={true}
                            label="Enter approx. mile mark"
                            style={{ width: '50px' }}>


                        </InputText><span className="mile-mark"> <i class="pi pi-caret-left"></i> Enter approx. mile point</span>
                    </div>

                    <div >
                        {/* Select the hazard */}
                        <Dropdown
                            className="haz-dd" value={state.hazard}
                            name="hazard"
                            options={props.hazards.map(h => h)}
                            required={true}
                            onChange={onChange}
                            style={{ width: '200px' }}
                            placeholder="Select a hazard type" optionLabel="type">
                        </Dropdown>
                    </div>

                    <div>
                        {/* Describe the issue */}
                        <InputTextarea placeholder="enter a brief description of the issue"
                            rows={5} cols={30}
                            name="description"
                            value={state.description}
                            onChange={onChange}
                            autoResize={true}
                            required={true}>
                        </InputTextarea>
                    </div>
                    {props.user.isAdmin === false ?
                        <div>
                            {/* Check if they agree to be contacted */}
                            <span className="maint-checkbox"><Checkbox id="contact-check"
                                name="checked"
                                value={state.checked}
                                onChange={e => onCheck(e)} checked={state.checked}>
                            </Checkbox></span>
                            <label htmlFor="contact-check" style={{ wordBreak: "break-word" }} >
                                Is it ok to follow up with you about this issue if more information is needed?</label>
                        </div> : ""}

                    {/* This field will show if the user agrees to be contacted */}
                    {state.checked === true ?
                        <div><InputMask mask="999-999-9999"
                            name="phone"
                            value={state.phone}
                            onChange={onChange}
                            placeholder="enter phone number">
                        </InputMask></div> :
                        ""}


                    <div><Button label="Submit"
                        icon="pi pi-check" iconPos="right"
                        className="p-button-raised p-button-rounded p-button-primary"
                        type="submit"
                        onClick={() => {
                            // Make sure fields are filled out correctly before submitting
                            if (/^\d+(\.\d+)?$/.test(state.location) && state.description !== "" && state.hazard !== "") {
                                handleSubmit()
                            }
                            else {
                                handleError()
                            }

                        }}

                    >

                    </Button>
                    </div>
                    <div className="error-message">{state.message}</div>
                </div>

            </div>
        </React.Fragment>

    )
}
export default MaintenanceRequestForm

