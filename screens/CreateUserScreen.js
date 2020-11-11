import React, {useState} from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet, Alert} from 'react-native'
import firebase from '../database/firebase';


export const CreateUserScreen = (props) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const handleChangeText  = (name,value) => {
        setState({ ...state, [name]:value })
    }

    const saveNewUser = async () => {
        if (state.name==='') {
            alert('Por favor introduzca un nombre');
        } else {
            try {
                await firebase.db.collection('users').add({
                    name: state.name,
                    email: state.email,
                    phone: state.phone
                })
                
                Alert.alert('App', 'Usuario creado exitosamente')
                props.navigation.navigate('UsersList');
            } catch (error) {
                console.log(error);
            }
            
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput style={styles.inputText} placeholder="Name User"
                placeholderTextColor="#B0B3B8" 
                onChangeText={(value)=> handleChangeText('name',value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput style={styles.inputText} placeholder="Email User" 
                placeholderTextColor="#B0B3B8" 
                onChangeText={(value)=> handleChangeText('email',value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput style={styles.inputText} placeholder="Phone User" 
                placeholderTextColor="#B0B3B8" 
                onChangeText={(value)=> handleChangeText('phone',value)} />
            </View>
            <View>
                <Button style={styles.button} title="Save User" onPress = {() => saveNewUser()}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor: '#242526'
    },
    inputGroup: {
        flex: 1,
        marginBottom: 15,
        borderBottomColor: '#cccccc',
        backgroundColor: '#3A3B3C',
        borderRadius: 999,
        padding: 5,
        color:'#DFE1E6',
        paddingLeft: 15,
        paddingRight: 15
    },
    inputText: {
        color: '#DFE1E6',
    },
    button: {
        backgroundColor: '#2D88FF',
        borderRadius: 99
    }
})

export default CreateUserScreen