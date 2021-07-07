/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import type { Node } from 'react';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  StyleSheet, LayoutAnimation, Platform, UIManager, ActivityIndicator
} from 'react-native';
import { generateAntWinLikelihoodCalculator } from './utilities'
import { fetchAnts } from './api'
import styled from "styled-components/native"
import AntsTable from './components'

const SafeArea = styled.SafeAreaView`
  margin-top: 32px;
  padding: 24px;
  margin: 30px 20px 0px 20px;
  background-color: pink;
`

const Button = styled.TouchableOpacity`
  align-items: center;
  background-color: #009688;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 40px;
`

const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  align-self: center;
  text-transform: uppercase;
`

const App = () => {
  const [ants, setAnts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
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

  // useEffect(() => {
  //   console.log("changing state")
  // }, [ants])

  const onPress = () => {
    // console.log("On press")
    // trigger algorithm function for each of the ants 

    // [TODO] perform constant time operations if array.length increases exponentially
    (ants).forEach((ant, index) => {
      // slice the state and create a new Array
      function removeItemWithSlice(index) {
        return [...ants.slice(0, index), ...ants.slice(index + 1)]
      }

      ant.loading = true
      const shallowCopy = removeItemWithSlice(index)
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

export default App;
