import React, { Component } from "react";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';


export default class completeRoute extends Component {
    render() {
        return(
        <Dialog header="Route Completed" visible={this.state.visible1} style={{ width: '50vw' }} footer={footer} onHide={this.onHide} >
            <div>Date Completed:
                    <Calendar value={this.state.date} onChange={(e) => this.setState({ date: e.value })} placeholder="MM/DD/YY"></Calendar>                    </div>
            <div>
                Time to Complete:
                <InputText value={this.state.time} onChange={(e) => this.setState({ time: e.target.value })} placeholder="HH:MM:SS" />
            </div>
        </Dialog>
        )

    }

}