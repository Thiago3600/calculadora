import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    Dimensions
} from 'react-native'

const styles = StyleSheet.create({
    button: {
        fontSize: 30,
        height: Dimensions.get('window').width / 5,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#F0F0F0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888'
    },
    operationButton:{
        color: '#FFF',
        backgroundColor: '#FA8231'
    },
    buttonDouble:{
        width: (Dimensions.get('window').width / 4)*2
    },
    buttonTriple:{
        width: (Dimensions.get('window').width / 4)*3
    },
    buttonEquals:{
        color: '#FFF',
        backgroundColor: '#0A73F6'
    }
})

export default props => {
    const styleButton = [styles.button]
    if (props.double) {
        styleButton.push(styles.buttonDouble)
    }
    if (props.triple) {
        styleButton.push(styles.buttonTriple)
    }
    if (props.operation) {
        styleButton.push(styles.operationButton)
    }
    if (props.equals) {
        styleButton.push(styles.buttonEquals)
    }
    return (
        <TouchableHighlight onPress={() => props.onClick(props.label)}>
            <Text style={styleButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}