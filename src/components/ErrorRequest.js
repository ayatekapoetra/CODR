import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('screen')

const ErrorRequest = props => {
    return (
        <View style={{height: height, width: '100%', backgroundColor: '#FFF'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {
                    props.errCode <= 500 &&
                    <>
                    <Text style={styles.txtTitle}>Error Code {props.errCode}</Text>
                    <LottieView style={{width: width}} source={require('../../assets/lottie/401.json')} autoPlay loop />
                    </>
                }
                {
                    props.errCode >= 500 &&
                    <>
                    <Text>Error Code {props.errCode}</Text>
                    <LottieView style={{width: width}} source={require('../../assets/lottie/500.json')} autoPlay loop />
                    </>
                }
            </View>
        </View>
    )
}

export default ErrorRequest

const styles = StyleSheet.create({
    txtTitle: {
        fontSize: 30,
        fontFamily: 'Poppins-Medium',
        fontWeight: '400',
    },
})