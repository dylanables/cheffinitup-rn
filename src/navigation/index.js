import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeScreen from '../screens/RecipeScreen';
import SwipeScreen from '../screens/SwipeScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <Stack.Navigator initialRouteName="Swipe" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Recipe" component={RecipeScreen} />
            <Stack.Screen name="Swipe" component={SwipeScreen} />
        </Stack.Navigator>
    )
}

export default AppNavigation;