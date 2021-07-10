import React, { useState, useRef } from 'react';
import {  SafeAreaView,   StatusBar,} from 'react-native'
import { _storeUser, _retrieveUser } from '../services/storage'
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native"
import { Dimensions } from 'react-native';

const dimensions = (Dimensions.get('window'))

const ScreenContainer = styled.View`
    padding: 20px;
    padding-top: ${parseInt(dimensions.height - 100) / 5}px;
    /* background-color: pink; */
    width: 100%;
`
const Title = styled.Text`
  font-size: 26px;
  text-align: center;
  color: #009688;
  padding-top: 10px;
  font-weight: 700;
  /* font-family: Verdana, sans-serif; */
`
const InputField = styled.TextInput`
    padding: 10px;
    border-radius: 5px;
    font-size: 18px;
    border: 1px solid gray;
    margin: 20px 20px 0px 20px;
`
const Button = styled.TouchableOpacity`
  align-items: center;
  background-color: #009688;
  padding: 10px;
  border-radius: 10px;
  margin: 30px 40px;
`
const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  align-self: center;
  text-transform: uppercase;
`
const Label = styled.Text`
  font-size: 12px;
  text-align: center;
  color: gray;
`
export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState({ error: false, message: "" })
    const [passwordError, setPasswordError] = useState({ error: false, message: "" })
    const passwordInput = useRef(null)
    const navigation = useNavigation()

    React.useEffect(async () => {
        const user = await _retrieveUser()
        if (user) {
            navigation.push("Main")
        }
    }, [])

    const onPress = () => {
        // check length username and password
        // if error setError
        if (username.length < 3) {
            setUsernameError({ error: true, message: 'Username too short' })
        } else if (password.length < 6) {
            setPasswordError({ error: true, message: "password too short" })
        } else {
            // navigate
            setUsernameError({ error: false, message: "" })
            setPasswordError({ error: false, message: "" })
            _storeUser(username)
            navigation.push("Main")
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
                <Title>
                    Ants' Race
                </Title>
            <ScreenContainer >
                <Label>
                    You must be logged in to start racing.
                </Label>
                <InputField
                    placeholder="Username"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInput.focus()}
                    keyboardType="default"
                    autoCorrect={false}
                    value={username}
                    onChangeText={setUsername}
                    onFocus={() => setUsernameError({ error: false, message: "" })}
                />
                {usernameError.error && <Label style={{ color: "red", marginTop: 10 }}>{usernameError.message}</Label>}
                <InputField
                    ref={passwordInput}
                    placeholder="Password"
                    returnKeyType="go"
                    secureTextEntry
                    keyboardType="default"
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setPasswordError({ error: false, message: "" })}
                />
                {passwordError.error && <Label style={{ color: "red", marginTop: 10 }}>{passwordError.message}</Label>}
                <Button onPress={onPress}>
                    <ButtonText>LOG IN</ButtonText>
                </Button>
            </ScreenContainer>
        </SafeAreaView>
    )
}