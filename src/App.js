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
import { _deleteUser, _retrieveUser } from './services/storage'

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

const App = (props) => {
    const [username, setUsername] = React.useState(null)

    React.useEffect(async () => {
        const user = await _retrieveUser()
        if (user) {
            // navigation.navigate("Main", {username : user})
            setUsername(user)
        }
    }, [])

    const initialRoute = username ? Routes.Main : Routes.Login
    
    console.log(initialRoute)

    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName={initialRoute}>
                <RootStack.Screen
                    name={Routes.Login}
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name={Routes.Main}
                    component={MainScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: "pink",
                          },
                        headerTintColor: 'blue',
                        headerTitleStyle: {
                          fontWeight: 'bold',
                        },
                        headerLeft: () => null,
                        headerRight: (props) => (
                            <Logout
                                {...props}
                                onPress={() => {
                                    _deleteUser()
                                    console.log(props)
                                    // navigation.pop()
                                }}
                            >Logout</Logout>
                        ),
                    }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
export default App
