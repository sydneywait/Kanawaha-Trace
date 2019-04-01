import React, { Component } from "react";
import { Dropdown } from 'primereact/dropdown';

const SelectRoutePoints = (state, footer)=> {
    const start = [
        { name: 'Wildcat Hollow', code: '1' },
        { name: 'Blue Sulphur Rd', code: '2' },
        { name: 'Camp Arrowhead', code: '3' },
        { name: 'Howells Mill', code: '4' },
        { name: 'Canaan Lands', code: '5' }
    ];

    const end = [
        { name: 'Wildcat Hollow', code: '1' },
        { name: 'Blue Sulphur Rd', code: '2' },
        { name: 'Camp Arrowhead', code: '3' },
        { name: 'Howells Mill', code: '4' },
        { name: 'Canaan Lands', code: '5' }
    ];

    return (
        <React.Fragment>
            <Dialog header="Edit Start and End Points" visible={state.visible} style={{ width: '50vw' }} footer={footer} onHide={this.onHide} >

                <div className="exp-dd-cont">
                    <Dropdown className="exp-dd" value={state.start} options={start} onChange={this.onStartChange} style={{ width: '200px' }} placeholder="Select a Start Point" optionLabel="name" />
                    <Dropdown className="exp-dd" value={state.end} options={end} onChange={this.onEndChange} style={{ width: '200px' }} placeholder="Select an End Point" optionLabel="name" />
                </div>
            </Dialog>


        </React.Fragment>
    )
}

export default SelectRoutePoints