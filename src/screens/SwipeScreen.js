import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories'
import Recipes from '../components/recipes'
import axios from 'axios'
import SwipeCard from '../components/swipeCard'
import Navbar from '../components/navbar'

export default function SwipeScreen() {

    const [activeCategory, setActiveCategory] = useState("Beef");
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(()=>{
        getCategories();
        getRecipes();
    }, [])

    const handleChangeCategory = category => {
        getRecipes(category);
        setActiveCategory(category)
        setRecipes([])
        setQuery("")
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
            if (response && response.data) {
                setCategories(response.data.categories)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    const getRecipes = async (activeCategory="Beef") => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`)
            if (response && response.data) {
                setRecipes(response.data.meals)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    const getRecipesBySearch = async (query) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            if (response && response.data) {
                setRecipes(response.data.meals)
                setActiveCategory(null)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

  return (
    <View className="flex-1 bg-white">
        <StatusBar style='dark' />
        <View className="space-y-6 pt-14">
            <Navbar screen="Swipe"/>

            {/* Search bar */}
            {/*
            <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
                <TextInput 
                    placeholder='Search recipes'
                    placeholderTextColor={'gray'}
                    style={{fontSize: hp(1.7)}}
                    className="flex-1 text-base mb-1 pl-3 tracking-wider"
                    onChangeText={newQuery => setQuery(newQuery)}
                    value={query} />
                <View className="bg-white rounded-full p-3">
                    <TouchableOpacity onPress={()=>getRecipesBySearch(query)}>
                        <MagnifyingGlassIcon size={hp(2.7)} strokeWidth={3} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
            */}

            {/* Recipes */}
            <View className="min-h-[80%] w-full">
                <SwipeCard />
            </View>

            {/* Categories */}
            {/*
            <View>
                {
                    categories.length > 0 && 
                    <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
                }
            </View>
            */}
            
        </View>
    </View>
  )
}