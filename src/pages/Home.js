import { 
  ScrollView,
  StyleSheet, 
  Text, 
  View, 
  Dimensions,
  Image
} from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import React, { useCallback, useState, useEffect } from 'react'
import moment from 'moment'
import Loading from '../components/Loading'
import ErrorRequest from '../components/ErrorRequest'

import {API_URL, API_TOKEN} from "@env"

const uri = API_URL + 'forecast?lat=-6.200000&lon=106.816666&units=metric&appid=' + API_TOKEN

/**
 * testing error code
 * const uri = API_URL + 'forecast?lat=-6.200000&lon=106.816666&units=metric&appid=' + '34b92485cb4a24adba23bf98fb44eddaX'
 * **/


const { width, height } = Dimensions.get('screen')

const Home = ({backgroundStyle, isDarkMode, bgColor}) => {
  const [data, setData] = useState(null)
  const [nextWeather, setNextWeather] = useState([])

  const GET_DATA_FORECAST = async () => {
    let response = await fetch(uri);
    let json = await response.json();
    setData(json)

    let {list} = json
    list = list.slice(1, list.length)
    list = list.map( l => ({...l, dt_mom: moment(l.dt_txt).format('dddd, DD MMM YYYY')}))
    const arrayUniqueByKey = [...new Map(list.map(item => [item['dt_mom'], item])).values()];
    setNextWeather(arrayUniqueByKey.slice(1, 4))
  }

  useEffect(() => {
    GET_DATA_FORECAST()
    Geolocation.getCurrentPosition((position) => console.log(position),
      (error) => console.log(error.code, error.message), { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
    return () => GET_DATA_FORECAST()
  }, [])

  
  // console.log(data);
  return (
    <View>
      {
        !data ? 
          <Loading />
          :
          <ScrollView>
            {data.cod === '200' ?
            <View
              style={{
                ...backgroundStyle,
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: width,
                height: height}}>
                <Text 
                  style={[
                    styles.txtColor(isDarkMode, bgColor), 
                    styles.txtTitle]}>
                    {data.city.name}
                </Text>
                <Text style={styles.txtSubtitle}>Indonesia</Text>
                <Image
                  style={styles.largeLogo}
                  resizeMode={'cover'}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@4x.png`,
                  }}
                />
                <Text style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 20
                }}>
                  {moment(data.list[1].dt_txt).format('dddd, DD MMM YYYY')}
                </Text>
                <View style={{
                  height: height * .13,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'flex-start'}}>
                  <Text style={styles.txtTemperatur}>{(data.list[1].main.temp).toFixed(1)}</Text>
                  <Text style={{marginTop: 10, fontSize: 20, fontWeight: 'bold', color: '#889DAE'}}>O</Text>
                </View>
              <View>
                <Text style={styles.txtDescription}>
                  {data.list[1].weather[0].description}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                {nextWeather.map( e => 
                  <View key={e.dt} style={{
                    marginVertical: 5,
                    paddingHorizontal: 15,
                    width: width}}>
                      <View style={{
                        flexDirection: 'row',
                        borderWidth: .5,
                        borderColor: '#889DAE',
                        padding: 15,
                        borderRadius: 20
                      }}>
                        <View style={{width: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFA41A', borderRadius: 100, marginRight: 20}}>
                          <Image
                            style={styles.tinyLogo}
                            resizeMode={'cover'}
                            source={{
                              uri: `https://openweathermap.org/img/wn/${e.weather[0].icon}@4x.png`,
                            }}
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <Text style={styles.textItemsDate}>
                            {moment(e.dt_txt).format('dddd, DD MMM YYYY')}
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textItemsTmp}>{(e.main.temp).toFixed(1)}</Text>
                            <Text style={styles.txtDegrees}>O</Text>
                          </View>
                          <Text style={styles.txtDescription}>{e.weather[0].description}</Text>
                        </View>
                      </View>
                  </View>
                )}
              </View>
            </View> 
            :
            <ErrorRequest errCode={data.cod}/>
            }
          </ScrollView>
      }
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  txtColor: (themeDark, color) => themeDark ? color.txtDark : color.txtlight,
  txtTitle: {
    fontSize: 30,
    fontFamily: 'Poppins-Medium',
    fontWeight: '400',
  },
  txtSubtitle: {
    fontSize: 16,
    fontWeight: '200'
  },
  txtTemperatur: {
    color: '#889DAE',
    fontSize: 90,
    fontWeight: '500',
    fontFamily: 'Poppins-Light'
  },
  txtDescription: {
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Light',
    color: '#798D9E',
  },
  textItemsDate: {
    fontSize: width * .04,
    fontFamily: 'Poppins-Bold',
    color: '#889DAE',
  },
  textItemsTmp: {
    fontFamily: 'Poppins-Light',
    fontSize: 30,
    color: '#889DAE'
  },
  txtDegrees: {
    fontFamily: 'Poppins-Light',
    color: '#889DAE'
  },
  largeLogo: {
    // backgroundColor: '#000',
    width: width * .7,
    height: width * .4,
  },
  tinyLogo: {
    // backgroundColor: '#000',
    width: 80,
    height: 70,
  },
})
