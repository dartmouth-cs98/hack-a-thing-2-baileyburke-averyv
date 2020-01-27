import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from  'react-native';
import { Icon, Button } from 'react-native-elements';

/*
TodoItem class based on Tyler Pott's tutorial How To Code Your First Mobile App 
in React Native (https://www.youtube.com/watch?v=NuZOwsmzcro)
*/
export default class TodoItem extends React.Component {
    constructor (props) {
        super(props);
    }
    
    // Adapted from  https://www.linkedin.com/learning/react-native-essential-training/welcome?u=2167153
    // This method calls setCurrentTodo (passed in as a prop) with the selected todo item
    handlePress = () => {
        this.props.onPress(this.props.todoItem.id);
    }
    
    render() {
        const todoItem = this.props.todoItem;
        return (
            <TouchableOpacity 
                style={styles.todoItem}
                onPress={this.handlePress}
                >
                <View style={styles.todoLeft}>
                    <Button 
                        icon={{
                            type: 'ionicon',
                            name: (todoItem.done) ?  'ios-radio-button-on' : 'ios-radio-button-off',
                        }}
                        type="clear"
                        onPress={() => this.props.toggleDone()}
                    />
                    <Text style={[styles.todoText, (todoItem.done) ? {color : '#AAAAAA'} : {color : '#313131'}]}>
                        { todoItem.title }
                    </Text>
                </View>
                <Button 
                    icon={{
                          name:"ios-trash",
                          type:'ionicon',
                          color: (todoItem.done) ? '#AAAAAA' : 'black',
                          size: 30
                      }}
                    type="clear"
                    onPress={() => this.props.removeTodo()}
                />
            </TouchableOpacity>
        )
    }}

const styles = StyleSheet.create({
    todoText: {
        fontFamily: 'Trebuchet MS',
        marginLeft: 10
    },
    todoLeft: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    todoItem: {
        marginBottom: 5,
        marginHorizontal: 10,
        height: 60,
        borderColor: '#DDD',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15
    },
    checkButton: {
        paddingRight: 10
    }
})