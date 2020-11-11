import React, {useEffect, useState} from 'react'
import {View,Text,ScrollView, Button, StyleSheet} from 'react-native'
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'


export const UsersList = (props) => {

    const [users, setUsers] = useState([])

    useEffect( () => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc =>{
                const {name,email,phone} = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                })
            });

            console.log(users)
            setUsers(users)
        });
    }, [])

    return (
        <ScrollView style={styles.container}>

            <Button title="Create User" style={styles.button} onPress={()=> props.navigation.navigate('CreateUserScreen')} />
            
            {
                users.map(user => {
                    console.log(user);
                    return (
                        <ListItem key={user.id} containerStyle={styles.listItem} bottomDivider onPress={ () => {
                            props.navigation.navigate('UserDetailScreen', {
                                userId: user.id
                            })
                        }}>
                            <ListItem.Chevron/>
                            <Avatar 
                            source={{uri: 'data:image/png;base64,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'}} rounded/>
                            <ListItem.Content>
                                <ListItem.Title style={{ color: '#ffffff'}}>{user.name}</ListItem.Title>
                                <ListItem.Subtitle style={{ color: '#DFE1E6'}}>{user.email}</ListItem.Subtitle>
                                <ListItem.Subtitle style={{ color: '#B0B3B8'}}>{user.phone}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>

                    )
                })
            }
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#242526'
    },
    listItem: {
        backgroundColor: '#3A3B3C',
        color:'#DFE1E6'
    },
    button: {
        backgroundColor: '#2D88FF'
    }
})

export default UsersList