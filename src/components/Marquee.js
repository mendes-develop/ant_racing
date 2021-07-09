import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { _storeUser, _retrieveUser } from '../api'
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native"
import { Dimensions, Animated, Image, Easing } from 'react-native';

const width = Dimensions.get('window').width
// claculate x
// x = -(20px paddingRight + 40px antWidth) + (width / 3)
// const ant1initial = { x: -(60), y: 0 }
// const ant2initial = { x: -(60 + (width/3)), y: 0 }
// const ant3initial = { x: -(60 + (width * (2/3))), y: 0 }
// MARK : UI COMPONENTS

export default class Marquee extends React.Component {
    animatedValues = []

    constructor(props) {
        super(props)

        this.antsArray = new Array(20).fill(true)
        this.antsArray.forEach((_, index) => {
            this.animatedValues[index] = new Animated.Value(-60)
        })
    }

    componentDidMount() {
        this.animate()
    }

    animate(toValue = width) {
        const animations = this.antsArray.map((_, index) => {
            this.animatedValues[index].setValue(-60)
            return Animated.timing(this.animatedValues[index], {
                toValue,
                duration: 3000,
                useNativeDriver: true,
                easing: Easing.linear
            })
        })
        Animated.stagger(1000, animations).start(() => this.animate())
    }

    render() {
        return (
        <View style={{position: "absolute",bottom: 0,}}>
            {this.animatedValues.map((x, index) => <Animated.Image key={index} style={[{
                height: 30,
                width: 40,
                marginTop: (index > 0 ? -30 : null),
                transform: [{ translateX: x }]
            }]}
                source={{ uri: 'https://www.clipartmax.com/png/middle/205-2051729_ant-png-image-background-ants-line-cartoon-png.png' }} />)}
        </View>
        )
    }
}