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
import { _deleteUser } from './services/storage'

const Logout = styled.Text`
  font-size: 16px;
  text-align: center;
  color: black;
  margin-right: 10px;
`

const LandStack = createStackNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const Routes = { Login: "Login", Main: "Main" }
function LandStackScreen() {
    return (
        <LandStack.Navigator>
            <LandStack.Screen
                name={Routes.Login}
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
            <MainStack.Screen name={Routes.Main} component={MainScreen} options={{
                headerLeft: () => null,
                headerRight: (props) => (
                    <Logout
                        {...props}
                        onPress={() => {
                            _deleteUser()
                            navigation.push(Routes.Login)
                        }}
                    >Logout</Logout>
                ),
            }} />
        </MainStack.Navigator>
    )
}

const App = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName={Routes.Login}>
                <RootStack.Screen
                    name={Routes.Login}
                    component={LandStackScreen}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name={Routes.Main}
                    component={MainStackScreen}
                    options={{ headerShown: false, tabBarVisible: false }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
export default App
