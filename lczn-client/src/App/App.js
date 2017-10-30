import React, { Component } from 'react';
import io from 'socket.io-client';
import Subscribe from '../Subscribe/Subscribe';
import Floor from '../Floor/Floor.js';
import Location from '../Location/Location';
import { Panel } from 'react-bootstrap';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            clientID: null,
            positions: null,
            delta: null,
        };
        this.handleSelectedClient = this.handleSelectedClient.bind(this);
        this.renderPositions = this.renderPositions.bind(this);
    }
    handleSelectedClient(client) {
        console.log("inside app.js selected " + client);
        this.setState({
            clientID: client,
            positions: null
        });
        const socket = io('http://localhost:4200', { query: 'subscribe='+client});
        socket.on('message', (message) => {
            let position = JSON.parse(message);
            this.setState({
                positions: this.state.positions? this.state.positions.concat(position) : new Array(position),
                delta: position.coordinate
            });
        });
    }

    renderPositions() {
        let position_list = this.state.positions.map(function(position) {
            return( <Location position={position} />);
        });

        return(
            <div>
                {position_list}
            </div>
        );
    }
    render() {
        if(this.state.positions) {
            return (
                <div className="App">
                    <Subscribe onSelectedClient = {this.handleSelectedClient} />
                    <Floor delta = {this.state.delta}/>
                    {this.renderPositions()}

                </div>
            );
        } else {
            return (
                <div className="App">
                    <Subscribe onSelectedClient = {this.handleSelectedClient} />
                    <Floor delta = {this.state.delta}/>
                    <Panel>
                        Waiting for result
                    </Panel>

                </div>
            );
        }
    }
}

export default App;
