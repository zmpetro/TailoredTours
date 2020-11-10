import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert } from 'react-native';
import 'react-native-gesture-handler';
import globalStyles from '../styles';
import Button from '../components/button'
import * as Location from 'expo-location'
import DrawerHeader from '../components/drawerHeader'
import firebase, { auth } from 'firebase';
import TourSetupComponent from '../components/tourSetup'
import RouteCreationComponent from '../components/routeCreator'

const TourCreationScreen = props => {
    const [tourData, setTourData] = useState(null);
    const [routeData, setRouteData] = useState(null);
    const [userID, setUserID] = useState(''); 
    const [location, setLocation] = useState(null);
    useEffect(() => {getuserID() });

	useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
              Alert.alert('Permission to access location was denied, it is required for the map')
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          console.log(location)
        })();
      }, []);

    const getuserID = () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // user is not logged in 
                setUserID(user.uid)
            } else {
                setUserID(null)
            }
        })
    }

    const createTour = async (data) => {
        if (data.anchor == null || data.anchor == undefined) {
            Alert.alert('Please set an Anchor point for the tour')
        } else if (data.title == null || data.title == undefined || data.title == '') {
            Alert.alert('Please set a tour area title')
        } else 
        {
            setTourData(data)
        }
    }

    const createRoute = async (data) => {
        try {
            setRouteData(data)

            try {
                console.log(tourData.title, tourData.anchor, tourData.anchor.latitude, tourData.anchor.longitude)
                firebase.database().ref('/tours/' + userID )
                .push({
                    tourName: tourData.title,
                    owner: userID, // Redundant
                    createdAt: Date.now(),
                    lastModified: Date.now(),
                    anchor: tourData.anchor,
                    routes: data.routes,
                    nodes: data.nodes
                })                
                .then(
                    Alert.alert('Successfully saved!')
                )
                
            } catch (e) {
                Alert.alert(e.message)
                console.error(e.message)
            }
            
        } catch (e) {
            Alert.alert(e.message)
            console.error(e.message)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
        <DrawerHeader name="Create a Tour" openDrawer={(props.navigation != null)? props.navigation.openDrawer : false}/>
        <View style={styles.internalContainer}>
            {tourData === null && <TourSetupComponent submitTour={createTour} location={location} />}
            {tourData != null && <RouteCreationComponent createRoute={createRoute} location={location} tourName={tourData.title} userID={userID} />}
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    internalContainer: {
        height: '100%',
        alignItems: 'center',
    }
});


export default TourCreationScreen;