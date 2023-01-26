/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from './src/components/Button'
import Display from './src/components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
  equals: [false, false],
}

export default class App extends Component {



  state={
    ...initialState
  }

  addDigit = n =>{
    const clearDisplay = this.state.displayValue === '0' ||  this.state.clearDisplay
    
    if (n === '.' && this.state.displayValue.includes('.') && !clearDisplay) {
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n

    this.setState({displayValue, clearDisplay: false})

    if (n !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({values})
    }

  }



  clearDigit = () =>{
    this.setState({...initialState})
  }

  invertValue = () =>{

    let currentValue = this.state.current
    let values = [...this.state.values]
    let newValue = eval(`${values[currentValue]} * -1`)

    values[currentValue] = newValue

    this.setState({values, displayValue: newValue})
  }

  setOperation = operation =>{

    if (this.state.equals[0]) {
      console.warn(this.state.equals[0])
      this.setState({
        ...initialState
      })
      return
    }

    if (this.state.current === 0) {
      this.setState({operation, current: 1, clearDisplay: true})
    } else {

      
      
      this.state.equals[0] = operation === '='

      const equals = this.state.equals[0]
      
      const values = [...this.state.values]
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (error) {
        values[0] = this.state.values
      }
      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values,
        equals: [true, false]
      })
    }
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <Display value={this.state.displayValue}/>
        <View style={styles.buttons}>

          <Button label="C" triple onClick={this.clearDigit}/>
          <Button label="/" operation onClick={this.setOperation}/>

          <Button label="7" onClick={this.addDigit}/>
          <Button label="8" onClick={this.addDigit}/>
          <Button label="9" onClick={this.addDigit}/>
          <Button label="*"  operation onClick={this.setOperation}/>

          <Button label="4" onClick={this.addDigit}/>
          <Button label="5" onClick={this.addDigit} />
          <Button label="6" onClick={this.addDigit} />
          <Button label="-" operation onClick={this.setOperation}/>

          <Button label="1" onClick={this.addDigit}/>
          <Button label="2" onClick={this.addDigit}/>
          <Button label="3" onClick={this.addDigit}/>
          <Button label="+" operation onClick={this.setOperation}/>

          <Button label="+/-" onClick={this.invertValue}/>
          <Button label="0"  onClick={this.addDigit}/>
          <Button label="."  onClick={this.addDigit}/>
          <Button label="="  equals onClick={this.setOperation}/>
        </View>
      </SafeAreaView>
    )
  }
}
  
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttons:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})


