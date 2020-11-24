import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
// import RadioButton from './components/RadioButton';
import 'react-native-gesture-handler';
import Button from '../components/button'
import DrawerHeader from '../components/drawerHeader'
import MyToursScreen from './myToursScreen'
import TourCreationScreen from './tourCreationScreen'
import firebase from 'firebase'
import FinalizeTourScreen from './finalizeTourScreen';

const Drawer = createDrawerNavigator();
const SignedInScreen = props => {
useEffect(() => {checkIfLoggedIn() });
	const checkIfLoggedIn = () => {
		firebase.auth().onAuthStateChanged(function(user) {
			if (!user) {
				// user is not logged in 
				//navigation.navigate('Login') // This is causing error on logout
			}
		})
	}
	const signOut = () => {
		props.navigation.navigate('Home')
		firebase.auth().signOut()
	} 
	const returnHome = () => {
		props.navigation.navigate('Home')
	}

	{/*const PROP = [
		{ 
			key: 'private',
			text: 'Private'
		},
		{
			key: 'public',
			text: 'Public'
		},
	];

	const render() {
		return (
			<View style={styles.container}>
				<RadioButton PROP={PROP} />
			</View>
		);
	} */}

	return (
		<NavigationContainer independent={true}>
		<Drawer.Navigator initialRouteName="My Tours" drawerContent={props => {
			// This filters out any screens we don't want to show
			// that are controlled by this navigator
			const {state, ...rest} = props;
			const newState = {...state};
			/*<View style={styles.container}>
				<RadioButton PROP={PROP} />
			</View>*/
			newState.routes = newState.routes.filter(item => item.name != ['Finalize Tour'])
		return (
			<DrawerContentScrollView {...props}>
			<DrawerItem label="Main Screen" onPress={() => returnHome()} />
			<DrawerItemList state={newState} {...rest} />
			<DrawerItem label="Logout" onPress={() => signOut()} />
			</DrawerContentScrollView>
		)}} screenOptions={{
			cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
			}}>
			<Drawer.Screen name="My Tours" component={MyToursScreen} />
			<Drawer.Screen name="Tour Creator" component={TourCreationScreen} />
			<Drawer.Screen name="Finalize Tour" component={FinalizeTourScreen} />
		</Drawer.Navigator>
		</NavigationContainer>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		flex: 1,
		margin: '15%',
		alignContent: 'center',
	},
	header:{
		width:"100%",
		height:60,
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center",
		paddingHorizontal:20
	}
});
export default SignedInScreen;