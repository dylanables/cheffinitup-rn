import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

export default function SwipeCard() {
  return (
    <View className="justify-center items-center flex-1">
        <View className="w-[95%] h-[80%] rounded-xl shadow-xl">
            <ImageBackground
                source={{uri: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"}}
                className="w-full h-full rounded-xl overflow-hidden flex justify-end p-5"
            >
                <Text style={{fontSize: hp(3.5)}} className="text-white font-bold">Recipe Name</Text>
                <Text style={{fontSize: hp(2)}} className="text-white font-light leading-relaxed">Some description</Text>
            </ImageBackground>
        </View>   
    </View>
  )
}