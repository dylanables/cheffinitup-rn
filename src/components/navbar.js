import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {ArrowRightEndOnRectangleIcon, ArrowsRightLeftIcon, HomeIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'

export default function Navbar({screen}) {
    const navigation = useNavigation();
  return (
    <View className="mx-4 flex-row justify-between items-center mb-2">
        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
            <HomeIcon size={hp(4)} color="gray" />
        </TouchableOpacity>

        <Text>Cheffin It Up</Text>

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