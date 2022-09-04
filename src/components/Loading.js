import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('screen')

const Loading = () => {
    return (
        <View style={{height: height, width: '100%', backgroundColor: '#FFF'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <LottieView style={{width: 100}} source={require('../../assets/lottie/loading-light.json')} autoPlay loop />
            </View>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})