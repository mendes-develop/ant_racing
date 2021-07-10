import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { _storeUser, _retrieveUser } from '../services/api'
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native"
import { Dimensions, Animated, Image, Easing } from 'react-native';

const width = Dimensions.get('window').width
export default class Marquee extends React.Component {
    animatedValues = []

    constructor(props) {
        super(props)

        this.antsArray = new Array(50).fill(true)
        this.antsArray.forEach((_, index) => {
            this.animatedValues[index] = new Animated.Value(-40)
        })
    }

    componentDidMount() {
        this.animate()
    }

    animate(toValue = width) {
        const animations = this.antsArray.map((_, index) => {
            this.animatedValues[index].setValue(-40)
            return Animated.timing(this.animatedValues[index], {
                toValue,
                duration: 4200,
                useNativeDriver: true,
                easing: Easing.linear
            })
        })
        Animated.stagger(1400, animations).start(() => this.animate())
    }

    render() {
        return (
        <View style={{position: "absolute",bottom: 30,}}>
            {this.animatedValues.map((x, index) => <Animated.Image key={index} style={[{
                height: 30,
                width: 40,
                marginTop: (index > 0 ? -30 : null),
                transform: [{ translateX: x }]
            }]}
                source={require('../../images/ant.png')}/>)}
        </View>
        )
    }
}