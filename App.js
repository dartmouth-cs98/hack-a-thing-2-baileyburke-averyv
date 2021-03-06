import React from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/Header';
import InputBar from './components/InputBar';
import TodoDetail from './components/TodoDetail';
import TodoItem from './components/TodoItem';

/*
App class based on Tyler Pott's tutorial How To Code Your First Mobile App 
in React Native (https://www.youtube.com/watch?v=NuZOwsmzcro)
*/
export default class App extends React.Component {
  constructor () {
    super();

    this.state = {
      todoInput: '',
      todos: [
        { id: 0, title: 'Take out the trash', done: false, priority: 'low', date: new Date() },
        { id: 1, title: 'Cook dinner', done: false, priority: 'low', date: new Date()  }
      ],
      currentTodoId: null
      
    }

  }

  addNewTodo() {
    let todos = this.state.todos;

    todos.unshift({
      id: todos.length + 1,
      title: this.state.todoInput,
      done: false,
      priority: 'low',
      date: new Date()
    });

    this.setState({
      todos: todos,
      todoInput: ''
    });
  }
  
  // Adapted from  https://www.linkedin.com/learning/react-native-essential-training/welcome?u=2167153
  // This method takes an ID and sets the currentTodoId in state to this new ID
  setCurrentTodo = (itemId) => {
    this.setState({
      currentTodoId: itemId,
    });
  }

  // Adapted from  https://www.linkedin.com/learning/react-native-essential-training/welcome?u=2167153
  // This method sets the currentTodoId in state to null
  unsetCurrentTodo = () => {
    this.setState({
      currentTodoId: null,
    });
  }

  // Adapted from  https://www.linkedin.com/learning/react-native-essential-training/welcome?u=2167153
  // This method finds the current todo based on the currentTodoId in state
  currentTodo = () => {
    return this.state.todos.find(
      (todo) => todo.id === this.state.currentTodoId
    );
  }

  changePriority = (item, priority) => {
    let todos = this.state.todos;
    
    todos = todos.map( (todo) => {
      if (todo.id == item.id) {
        todo.priority = priority;
      }

      return todo;
    })

    this.setState({todos});
  }

  changeDate = (item, date) => {
    let todos = this.state.todos;
    
    todos = todos.map( (todo) => {
      if (todo.id == item.id) {
        todo.date = date;
      }

      return todo;
    })

    this.setState({todos});
  }

  toggleDone(item) {
    let todos = this.state.todos;

    todos = todos.map( (todo) => {
      if (todo.id == item.id) {
        todo.done = !todo.done;
      }

      return todo;
    })

    this.setState({todos});
  }

  removeTodo(item) {
    let todos = this.state.todos;

    todos = todos.filter((todo) => todo.id !== item.id);
    this.setState({todos});
  }

  render() {
    const statusbar = (Platform.OS =='ios') ? <View style={styles.statusbar}></View> : <View></View>;
    if (this.state.currentTodoId != null) {
      let todoData = this.currentTodo();
      
      return ( 
        <View>
          <TodoDetail 
            todoData={todoData} 
            onPriorityChange={this.changePriority} 
            onDateChange={this.changeDate} 
            onBack={this.unsetCurrentTodo} >
          </TodoDetail>
        </View>
      )} else {
        return (
          <View style={styles.container}>
            {statusbar}
      
            <Header title="Todo App!"/>
      
            <InputBar 
            textChange={todoInput => this.setState({ todoInput })}
            addNewTodo={ () => this.addNewTodo() } 
            todoInput={this.state.todoInput}
            />
            <FlatList  
              data={this.state.todos}  
              keyExtractor={(item, index) => index.toString()}
              renderItem= {({item, index}) => {
                return (
                  <TodoItem todoItem={item} 
                  toggleDone={() => this.toggleDone(item)} 
                  onPress={ this.setCurrentTodo }
                  removeTodo={() => this.removeTodo(item)}
                  />
                )
              }}/>

          </View>
        );
      }
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusbar: {
    backgroundColor: '#fFCE00',
    height: 40
  }

});
