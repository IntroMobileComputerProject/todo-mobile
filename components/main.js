import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/th';  // Import Thai locale
// import { useNavigation } from '@react-navigation/native';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';



export default function Main( ) {
    const [token, setToken] = useState('');
    const [activity, setActivity] = useState([]);

    const formatToThaiDateTime = (dateTime) => {
        const date = moment(dateTime);
        const year = date.year() + 543;  // Convert CE to BE
        return `${date.format('D MMM')} ${year} เวลา ${date.format('HH:mm')} น`;
    };
    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => (
    //             <Button onPress={() => navigation.toggleDrawer()} title="Menu" />
    //         ),
    //     });
    // }, [navigation]);

    useEffect(() => {
        // Get token from AsyncStorage
        const retrieveToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                }
            } catch (error) {
                console.error("Failed to get the token");
            }
        };
        retrieveToken();
    }, []);

    useEffect(() => {
        if (token) {
            fetch('https://7712-161-200-191-179.ngrok-free.app/Activity', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,"ngrok-skip-browser-warning": "69420"
                },
            })
            .then(response => {
                if (response.status === 401) {
                    Alert.alert("Error", "You are not authorized to view this page.");
                    return;
                }
                return response;
            })
            .then(response => response.json())
            .then(data => setActivity(data))
            .catch(error => console.error(error));
        }
    }, [token]); 

    moment.locale('th');

    return (
        <View style={styles.container}>
            <Text style={styles.header} >ToDoList</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Activities</DataTable.Title>
                    <DataTable.Title>Date/Time</DataTable.Title>
                </DataTable.Header>

                {activity.map((item) => (
                    <DataTable.Row key={item.activityId}>
                        <DataTable.Cell>{item.activityName}</DataTable.Cell>
                        <DataTable.Cell>{formatToThaiDateTime(item.activitiesTime)}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
});
