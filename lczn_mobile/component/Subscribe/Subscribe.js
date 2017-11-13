import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

export default class Subscribe extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            value: 'one',
            options: ['one', 'two','three','four','five','six']
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(index, value) {
        this.setState({
            value: value
        });

    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onSelectedClient(this.state.value);
    }
    render() {
        return(
            <View style={styles.subscribeContainer}>
                <View style={styles.selectContainer}>
                    <ModalDropdown
                        options={this.state.options}
                        onSelect={(idx, value) => this.handleChange(idx, value)}
                        textStyle={{fontSize: 20,}}
                        dropdownTextStyle={styles.dropdownTextStyle}
                    />
                </View>
                <View>
                    <Button
                        onPress={this.handleSubmit}
                        title="Submit"
                        style={styles.button}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subscribeContainer:{
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectContainer: {
        padding: 6
    },
    dropdownTextStyle: {
        fontSize: 18,
        color: 'black'
    },
    button: {
        backgroundColor: 'dodgerblue',
        color: 'white',
        borderRadius: 3
    },
});
