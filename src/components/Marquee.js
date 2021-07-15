import React from 'react';
import { View } from 'react-native'
import { Dimensions, Animated, Easing } from 'react-native';

const width = Dimensions.get('window').width
export default class Marquee extends React.Component {
    animatedValues = []
    animatedValue;
    animatedValue2;
    animatedValue3;

    constructor(props) {
        super(props)

        this.antsArray = new Array(3).fill(true)
        this.duration = 4200
        this.antsArray.forEach((_, index) => {
            this.animatedValues[index] = new Animated.Value(0)
        })

    }

    componentDidMount() {
        this.animate()
    }

    animate(toValue = width) {
        this.animatedValues.forEach((animatedValue, index) => {
            animatedValue.setValue(-40);

            Animated.loop(Animated.timing(animatedValue, {
                toValue,
                duration: this.duration,
                useNativeDriver: true,
                easing: Easing.linear,
                delay: this.duration * (index / this.animatedValues.length)
            })).start()
        })

    }

    render() {
        return (
            <View style={{ position: "absolute", bottom: 30, }}>
                {this.animatedValues.map((animatedValue, index) => (
                    <Animated.Image
                        key={index}
                        style={[{
                            height: 30,
                            width: 40,
                            bottom: 0,
                            position: "absolute",
                            transform: [{ translateX: animatedValue }],
                        }]}
                        source={require('../../images/ant.png')}
                    />))}
            </View>
        )
    }
}