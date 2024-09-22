import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { categoryData } from '../constants'
import { TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image'

export default function Categories({categories, activeCategory, handleChangeCategory}) {
  return (
    <Animated.View entering={FadeInDown.duration(1000).springify()}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-4 mt-4 mr-4"
            contentContainerStyle={{paddingHorizontal:  15}}
        >
        {
            categories.map((cat, index) => {
                let isActive = cat.strCategory == activeCategory;
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleChangeCategory(cat.strCategory)}
                        className="flex items-center space-y-1 mr-5"
                    >
                        <View className={`rounded-full p-[6px] ${isActive ? 'bg-red-500' : 'bg-black/10'}`}>
                            <CachedImage 
                                uri={ cat.strCategoryThumb}
                                style={{height: hp(6), width: hp(6)}}
                                className="rounded-full" 
                            />
                        </View>
                        <Text className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                            {cat.strCategory}
                        </Text>
                    </TouchableOpacity>
                )
            })
        }
        </ScrollView>
    </Animated.View>
  )
}