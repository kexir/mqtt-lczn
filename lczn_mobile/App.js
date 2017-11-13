/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import Floor from './component/Floor/Floor';
import Subscribe from './component/Subscribe/Subscribe';
import Location from './component/Location/Location';

export default class App extends Component<{}> {
    constructor() {
        super();
        this.state = {
            clientID: null,
            delta: null,
            positions: null,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };

        this.handleSelectedClient = this.handleSelectedClient.bind(this);
        this.renderPosition = this.renderPosition.bind(this);
    }

    handleSelectedClient(client) {
        alert("inside app.js selected " + client);
        this.setState({
            clientID: client,
            positions: null,
            delta: null
        });
        const socket = io('http://localhost:4200', { query: 'subscribe='+client});
        socket.on('message', (message) => {
            let position = JSON.parse(message);
            this.setState({
                delta: position.coordinate,
                positions: this.state.positions? this.state.positions.concat(position) : new Array(position),
                dataSource: this.state.dataSource.cloneWithRows(this.state.positions),
            });
        });
    }
    renderPosition(position) {
        return(
            <Location position={position}/>
        );
    }
    render() {

            return (
                <View style={styles.container}>
                    <Subscribe onSelectedClient = {this.handleSelectedClient}/>
                    <Floor delta = {this.state.delta}/>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderPosition}
                    />
                </View>
            );

    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 40
    }
});
