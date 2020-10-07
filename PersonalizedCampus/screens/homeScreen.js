import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/button'
import firebase from 'firebase'

const HomeScreen = props => {
    const navigation = useNavigation();
    var logo = props.active ? require('../assets/Logo-Full.png') : require('../assets/Logo-Full.png');

    const checkIfLoggedIn = () => {
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              // user is logged in 
              navigation.navigate('Tour Creation')
          } else {
              // user isn't logged in, 
              navigation.navigate('Login')
          }
      })
    }

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Take Tour" buttonStyle={styles.takeTourButton} textStyle={styles.takeTourText} onPress={() => navigation.navigate('Map')} />
          <Button title="Make Tour" buttonStyle={styles.makeTourButton} textStyle={styles.makeTourText} onPress={() => checkIfLoggedIn()} />
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
  imageContainer: {
    marginTop: 25,
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  takeTourButton: {
    height: '25%',
    width: '65%',
  },
  takeTourText: {
    fontSize: 40
  },
  makeTourButton: {
    height: '20%',
    marginTop: '40%',
    marginBottom: '10%'
  },
  makeTourText: {
    fontSize: 20
  },
  logo: {
    margin: 40,
    width: '100%',
    height: undefined,
    aspectRatio: 16/9
  }
});


export default HomeScreen;