import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

export default function SwipeCard(props) {
    const {name, image, desc} = props.recipe;
  return (
    <View className="justify-center items-center">
        <View className="w-[95%] h-[80%] rounded-xl shadow-xl">
            <ImageBackground
                source={{uri: image}}
                className="w-full h-full rounded-xl overflow-hidden flex justify-end p-5"
            >
                <Text style={{fontSize: hp(3.5)}} className="text-white font-bold">{name}</Text>
                <Text style={{fontSize: hp(2)}} className="text-white font-light leading-relaxed">{desc}</Text>
            </ImageBackground>
        </View>   
    </View>
  )
}