import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn({ navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        axios.post(
            'https://3ca6-161-200-191-20.ngrok-free.app/Tokens',
            {
              "userName": username,
              "userPassword": password,
            },
            {
              headers: { "ngrok-skip-browser-warning": "69420" },
            }
        )
        .then(async (response) => {
            await AsyncStorage.setItem('token', response.data.token);
            console.log(response.data.token);
            Alert.alert("Success", "Login successful.");
            navigation.navigate('AppDrawer');
        })
        .catch((error) => {
            Alert.alert("Error", "Login failed.")
            console.error(error);
        });
    }

    return (
        <View>
            <TextInput 
                style={styles.input} 
                placeholder="Username" 
                onChangeText={setUsername} />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});