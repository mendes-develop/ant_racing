import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View, LayoutAnimation, Platform, UIManager, ActivityIndicator
} from 'react-native';
import { generateAntWinLikelihoodCalculator } from '../utilities'
import { _retrieveUser } from '../services/storage'
import { fetchAnts } from '../services/api'
import { AntsTable, Marquee, Overlay } from '../components'
import styled from "styled-components/native"

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
const Main = ({ navigation, route }) => {
  const { username } = route.params
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [antsList, setAntsList] = useState([])

  useEffect(async () => {
    setLoading(true)
    // response will either have data or errors
    const response = await fetchAnts()
    if (response.data) {
      const antsData = response.data.ants.map((ant, i) => {
        ant.likelihood = null;
        ant.loading = false
        return ant
      })
      setAntsList(antsData)
    } else if (response.errors) {
      setError(true)
    }
    setLoading(false)
  }, [])

  useEffect(async () => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, [])


  const onPress = () => {
    setLoading(true);
    // map and update antsList loading state and likelihood
    const loadingAnts = antsList.map(ant => {
      ant.likelihood = null
      ant.loading = true
      return ant
    })
    // update state
    setAntsList(loadingAnts)
    runAlgorithm()
  }

  const shallowCopyArray = (i, array) => {
    // return a copy of the array without given element at index 'i'
    return [...array.slice(0, i), ...array.slice(i + 1)]
  }

  const runAlgorithm = async () => {
    (antsList).forEach((ant, index, array) => {
      // const shallowCopy = shallowCopyArray(index, antsList)
      const closure = generateAntWinLikelihoodCalculator()

      // inside the callback, update ant's likelihood and loading state
      // make a copy of the array without curr ant, append current and sort it
      // update list
      closure((likelihood) => {
        ant.likelihood = likelihood
        ant.loading = false
        const arr = [ant, ...shallowCopyArray(index, antsList)].sort((a, b) => {
          return (b.likelihood || 0.0) - (a.likelihood || 0.0)
        })

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAntsList(arr)
        if (index === array.length - 1) setLoading(false)
      })
    })
  }

  return (
    <React.Fragment>
      {loading && <Overlay style={{ flex: 1 }}><ActivityIndicator size="large" color="#009688" /></Overlay>}
      <SafeAreaView style={{ backgroundColor: "pink", flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        <StatusBar barStyle={'light-content'} />
        {username && <Label>Welcome back, {username}</Label>}
        {error ? <Text>Error</Text> : (
          <View>
            <Button onPress={onPress}>
              <ButtonText>Calculate Odds</ButtonText>
            </Button>
            <AntsTable data={antsList} />
          </View>)}
        <Marquee />
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Main;
