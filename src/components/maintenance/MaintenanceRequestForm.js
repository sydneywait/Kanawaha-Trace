import React from "react"
import "./Maintenance.css"
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask'

const MaintenanceRequestForm = (state, props, onChange, onCheck, handleSubmit) => {

    return (
        <React.Fragment>


                <h2 className="maint-req-header">{props.user.isAdmin===true?"Create a new Ticket":"Report a Maintenance or Trail Issue"}</h2>
                <div>
                    <InputText value={state.location} onChange={onChange}
                        name="location"
                        placeholder="Enter approx. mile mark">

                    </InputText>
                </div>

                <div >
                    <Dropdown
                        className="haz-dd" value={state.hazard}
                        name="hazard"
                        options={props.hazards.map(h => h)}
                        onChange={onChange}
                        style={{ width: '200px' }}
                        placeholder="Select a hazard type" optionLabel="type">
                    </Dropdown>
                </div>

                <div>
                    <InputTextarea placeholder="enter a brief description of the issue"
                        rows={5} cols={30}
                        name="description"
                        value={state.description}
                        onChange={onChange}
                        autoResize={true}>
                    </InputTextarea>
                </div>
{props.user.isAdmin===false?
                <div>
                    <Checkbox id="contact-check"
                        name="checked"
                        value={state.checked}
                        onChange={e => onCheck(e)} checked={state.checked}>
                    </Checkbox>
                    <label htmlFor="contact-check" style={{ wordBreak: "break-word" }} >
                        Is it ok to follow up with you about this issue if more information is needed?</label>
                </div>:""}


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
                    className="p-button-raised p-button-rounded p-button-success"
                    type="submit"
                    onClick={handleSubmit}
                >

                </Button>
                </div>

        </React.Fragment>

    )
}
export default MaintenanceRequestForm

