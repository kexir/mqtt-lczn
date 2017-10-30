import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class Location extends Component {
    render() {
        return (
            <Panel className="location-group-item">
                <div className="location-coordinate">
                    position: {this.props.position.coordinate[0]}
                    {' '}
                    {this.props.position.coordinate[1]}
                </div>
                <div className="location-estimate-method">
                    channel: {this.props.position.channel}
                </div>
            </Panel>
        );

    }
}

export default Location;