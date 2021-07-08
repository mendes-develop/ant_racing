import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/Main'
import LoginScreen from './screens/Login'
// import { _retrieveData } from './fetch/fetch'

const LandStack = createStackNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function LandStackScreen() {
    return (
        <LandStack.Navigator>
            <LandStack.Screen
                name="Land"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </LandStack.Navigator>
    )
}

function MainStackScreen() {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="Main" component={MainScreen} />
        </MainStack.Navigator>
    )
}

const App = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Land">

                <RootStack.Screen
                    name="Login"
                    component={LandStackScreen}
                    // options={{ headerShown: false }}
                />

                <RootStack.Screen
                    name="Main"
                    component={MainStackScreen}
                    options={{ headerShown: false, tabBarVisible: false }}
                />

            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default App
