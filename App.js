import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import InputBar from './components/InputBar';

export default class App extends React.Component {
  constructor () {
    super();

    this.state = {
      todoInput: '',
      todos: [
        { id: 0, title: 'Take out the trash', done: false },
        { id: 1, title: 'Cook dinner', done: false }
      ]
    }

  }
  
  render() {
    const statusbar = (Platform.OS =='ios') ? <View style={styles.statusbar}></View> : <View></View>;

  return (
    <View style={styles.container}>
      {statusbar}

      <Header title="Todo App!"/>

      <InputBar textChange={todoInput => this.setState({ todoInput })}/>

      <Text>{this.state.todoInput}</Text>

    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusbar: {
    backgroundColor: '#fFCE00',
    height: 40
  }
});
