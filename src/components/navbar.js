import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {ArrowRightEndOnRectangleIcon, ArrowsRightLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'

export default function Navbar({screen}) {
    const navigation = useNavigation();
  return (
    <View className="mx-4 flex-row justify-between items-center mb-2">
        <Image source={require('../../assets/avatar.png')} style={{width: hp(5.5), height: hp(5)}} />
        {console.log(String(screen))}
        {screen && (screen == "Home" ?
        <TouchableOpacity onPress={()=>navigation.navigate("Swipe")}>
            <ArrowsRightLeftIcon size={hp(4)} color="gray" />
        </TouchableOpacity> :
        <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
            <ArrowRightEndOnRectangleIcon size={hp(4)} color="gray" />
        </TouchableOpacity>
        )
        }
    </View>
  )
}