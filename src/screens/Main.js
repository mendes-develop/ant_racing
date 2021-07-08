import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  StyleSheet, LayoutAnimation, Platform, UIManager, ActivityIndicator
} from 'react-native';
import { generateAntWinLikelihoodCalculator, shallowCopyArray } from '../utilities'
import { fetchAnts, _retrieveUser } from '../api'
import styled from "styled-components/native"
import AntsTable from '../components'

const SafeArea = styled.SafeAreaView`
  margin-top: 32px;
  padding: 24px;
  margin: 30px 20px 0px 20px;
  background-color: pink;
`

const Label = styled.Text`
  font-size: 16px;
  text-align: center;
  color: black;
  padding-top: 10px;
`

const Button = styled.TouchableOpacity`
  align-items: center;
  background-color: #009688;
  padding: 10px;
  border-radius: 10px;
  margin: 20px 40px 10px 40px;
`

const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  align-self: center;
  text-transform: uppercase;
`

const Main = () => {
  const [username, setUsername] = useState(null)
  const [ants, setAnts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    // Find a way to not repeate this getter
    const user = await _retrieveUser()
    if(user) {
      setUsername(user)
    }

    // response will either have data or errors
    setLoading(true)
    const response = await fetchAnts()

    if (response.data) {
      const antsArray = response.data.ants.map((ant, index) => {
        ant.likelihood = null;
        ant.loading = false
        return ant
      })
      setAnts(antsArray)

    } else if (response.errors) {
      setError(true)
      console.log(response.errors[0].message)
    }

    setLoading(false)

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

  }, [])

  const onPress = () => {
    // trigger algorithm function for each of the ants 
    // [TODO] perform constant time operations if array.length increases exponentially
    (ants).forEach((ant, index) => {
      // slice the state and create a new Array

      ant.loading = true
      const shallowCopy = shallowCopyArray(index, ants)
      setAnts([
        ...shallowCopy, ant
      ])

      const callback = generateAntWinLikelihoodCalculator()
      callback(function (value) {
        // update ant likelihood and ant loading state
        ant.loading = false
        ant.likelihood = value

        // Array.sort
        const sortedArray = [...shallowCopy, ant].sort((a, b) => (b.likelihood || 0) - (a.likelihood || 0))
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAnts(sortedArray)
      })
    })
  }

  return (
      <SafeAreaView style={{ backgroundColor: "pink", flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        <StatusBar barStyle={'light-content'} />
        {username && <Label>Welcome back, {username}</Label>}
        {error && <Text>Error</Text> }
        {loading ? <ActivityIndicator /> : (
        <View>
          <Button onPress={onPress}>
            <ButtonText>Press Here</ButtonText>
          </Button>
          <AntsTable data={ants} />
        </View>)}
      </SafeAreaView>
  );
};

export default Main;
