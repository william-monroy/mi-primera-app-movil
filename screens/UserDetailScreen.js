import React, { useEffect, useState } from 'react'
import {View, TextInput, ScrollView, StyleSheet, Button, ActivityIndicator, Alert} from 'react-native'
import firebase from '../database/firebase'

export const UserDetailScreen = (props) => {

    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        phone: ''
    })

    const [loading, setLoding] = useState(true)

    const getUserbyId = async(id) =>{
        const dbRef = firebase.db.collection('users').doc(id)
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({
            ...user,
            id: doc.id,
        });
        setLoding(false);
    };

    useEffect(() => {
        getUserbyId(props.route.params.userId)
    },[])

    const handleChangeText  = (name,value) => {
        setUser({ ...user, [name]:value })
    }

    const deleteUser = async () => {
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.delete();
        props.navigation.navigate('UsersList')
    }

    const updateUser = async () => {
        
    }

    const openConfirmationAlert = () =>{
        Alert.alert('Eliminar Usuario', '¿Estas seguro de que deseas eliminar el usuario?', [
            {text: 'Si', onPress: () => deleteUser()},
            {text: 'No', onPress: () => console.log('cancelado')},
        ])
    }

    if (loading) {
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput style={styles.inputText} placeholder="Name User"
                placeholderTextColor="#B0B3B8" value={user.name}
                onChangeText={(value)=> handleChangeText('name',value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput style={styles.inputText} placeholder="Email User" 
                placeholderTextColor="#B0B3B8" value={user.email}
                onChangeText={(value)=> handleChangeText('email',value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput style={styles.inputText} placeholder="Phone User" 
                placeholderTextColor="#B0B3B8" value={user.phone}
                onChangeText={(value)=> handleChangeText('phone',value)} />
            </View>
            <View>
                <Button style={styles.button} color='#19AC52' title="Update User" onPress = {() => alert('works')}/>
            </View>
            <View>
                <Button style={styles.button} color='#AC2A2A' title="Delete User" onPress = {() => openConfirmationAlert()}/>
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
    },
    loader: {
        flex: 1,
        backgroundColor: '#242526',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default UserDetailScreen