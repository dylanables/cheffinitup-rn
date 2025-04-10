import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {ArrowsRightLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories'
import Recipes from '../components/recipes'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/navbar'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "../navigation/BottomTabs";
import GuestAlert from '../components/guestAlert'
import { GetFavorites } from '../helpers/favorites'

export default function HomeScreen() {

    const navigation = useNavigation();
    const [activeCategory, setActiveCategory] = useState("Beef");
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("");
    const [user, setUser] = useState();
    const [isAnonymous, setIsAnonymous] = useState(true)
    const [favs, setFavs] = useState();

    {/*
    useEffect(()=>{
        getCategories();
        getRecipes();
    }, [])
    */}

    useEffect(()=>{
        user && GetFavs(user.uid);
    }, [user])

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            setUser(user);
            if (user.isAnonymous == false) {
                setIsAnonymous(false);
            }
        } else {
            // User is signed out
            navigation.navigate("Onboard");
        }
    });

    const GetFavs = async (uid) => {
        console.log("UID: " + uid);
        const result = await GetFavorites(uid);
        console.log("Result: ", result);
        setFavs(result?.Favorites ? result?.favorites : [])
    }

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
        if (activeCategory == "Liked") {
            console.log("LIKED CAT CLICKED")
            try {
                const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=Side`)
                if (response && response.data) {
                    setRecipes(response.data.meals)
                }
            } catch (error) {
                console.error("Error:", error)
            }
        } else {
            console.log("OTHER CAT CLICKED")
            try {
                const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`)
                if (response && response.data) {
                    setRecipes(response.data.meals)
                }
            } catch (error) {
                console.error("Error:", error)
            }
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
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50}}
            className="space-y-6 pt-14"
        >

            {/* Disclaimer if anonymous */
                isAnonymous &&
                <GuestAlert />
            }

            {/* Heading text */}
            <View className="mx-4 space-y-2 mb-2">
                <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">Saved Recipes</Text>
            </View>

            {/* Search bar
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

            {/* Categories 
            <View>
                {
                    categories.length > 0 && 
                    <Categories 
                        categories={categories} 
                        activeCategory={activeCategory} 
                        handleChangeCategory={handleChangeCategory}
                    />
                }
            </View>

            {/* Recipes 
            <View>
                <Recipes recipes={recipes} />
            </View>

            */}

            <View>
                <Text>Recipes:</Text>
                <Text>{favs}</Text>
            </View>

            
            
        </ScrollView>
    </View>
  )
}