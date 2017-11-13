import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Location extends Component<{}> {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.coordinate}> position: {this.props.position.coordinate[0]}   {this.props.position.coordinate[1]} </Text>
                <Text style={styles.channel}> channel: {this.props.position.channel} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 2
    },
    coordinate: {
        fontSize: 10
    },
    channel: {
        fontSize: 10
    }
});