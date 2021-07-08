import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/stack';
import MainScreen from './screens/Main'
import LoginScreen from './screens/Login'
import { Text } from 'react-native';
import styled from "styled-components/native"
import { useNavigation } from '@react-navigation/native';
import { _deleteUser } from './api'

const Label = styled.Text`
  font-size: 16px;
  text-align: center;
  color: black;
  margin-right: 10px;
`

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
    const navigation = useNavigation()

    return (
        <MainStack.Navigator>
            <MainStack.Screen name="Main" component={MainScreen} options={{
                headerLeft: () => null,
                headerRight: (props) => (
                    <Label
                        {...props}
                        onPress={() => {
                            console.log("Logging out and going back to launch screen")
                            _deleteUser()
                            navigation.push("Login")
                        }}
                    >Logout</Label>
                ),
            }} />
        </MainStack.Navigator>
    )
}

const App = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName={"Login"}>

                <RootStack.Screen
                    name="Login"
                    component={LandStackScreen}
                    options={{ headerShown: false }}
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
