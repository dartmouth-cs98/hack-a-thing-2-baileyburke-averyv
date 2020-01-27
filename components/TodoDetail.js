import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Picker} from  'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker';

export default class TodoDetail extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            todo: this.props.todoData,
            priority: this.props.todoData.priority,
            date: this.props.todoData.date
        }
    }
    
    render() {
        const { todo } = this.state;
            return (
                <View style={styles.todo}>
                    <TouchableOpacity onPress={this.props.onBack}>
                        <Text style={styles.backLink}>Back</Text>
                    </TouchableOpacity>
                    <View style={styles.todoInfo}>
                        <Text style={styles.title}>{todo.title}</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerTitle}>Priority:</Text>
                        <ModalDropdown 
                            defaultValue={this.state.priority} 
                            style={styles.picker}
                            options={['low', 'medium','high']}
                            textStyle={styles.pickerText}
                            dropdownTextStyle={styles.pickerText}
                            onSelect = {(index, value) => 
                                [this.setState({priority: value}),
                                this.props.onPriorityChange(this.props.todoData, value)]}
                            />
                    </View>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerTitle}>Date:</Text>
                        <DatePicker 
                            style={styles.datePicker}
                            date={this.state.date} 
                            mode='datetime' 
                            placeholder='select date'
                            format='LLLL'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            onDateChange={(date) => 
                                {[this.setState({date: date}), 
                                this.props.onDateChange(this.props.todoData, date)]}}/>
                        </View>
                    </View>
                )
}}

const styles = StyleSheet.create({
    backLink: {
        marginTop: 30,
        fontSize: 20,
        marginBottom: 5,
    },
    todo: {
        margin: 10
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 10,
        paddingTop:10,
        marginBottom: 10,
        textAlign: 'center',
        backgroundColor: '#fFCE00'
    },
    pickerContainer: {
        marginLeft: 20,
        marginBottom: 20
    },
    picker: {
        height: 40,
        width: 120
    },
    datePicker: {
        height: 40,
        width: 300,
    },
    pickerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    pickerText: {
        fontSize: 20,
        borderColor: '#d3d3d3',
        borderWidth: 1,
        height: 40,
        textAlign: 'center',
        paddingTop: 10
    }
})