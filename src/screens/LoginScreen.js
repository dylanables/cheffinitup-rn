import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

export default function LoginScreen() {

const navigation = useNavigation()

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // user is signed in already, redirect to homepage
    navigation.navigate('Home');
  }
});

const signIn = async () => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        if (user) navigation.navigate('Home');
    } catch (error) {
        console.log(error);
        alert("Sign in failed: " + error.message);
    }
}

const signUp = async () => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        if (user) navigation.navigate('Home');
    } catch (error) {
        console.log(error);
        alert("Sign in failed: " + error.message);
    }
}

  return (
    <View className="flex-1 justify-center items-center space-y-10">
        <StatusBar style='light' />

        <View className="mb-5">
            <Image source={require('../../assets/cheffin-logo.png')} style={{width: hp(20), height: hp(20)}} />
        </View>

        <View className="flex items-center space-y-2">
            <Text style={{fontSize: hp(2)}} className="font-medium text-white tracking-widest">Login</Text>
            <TextInput placeholder="email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="password" value={password} onChangeText={setPassword} />
            <TouchableOpacity onPress={signIn}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signUp}>
                <Text>Create Account</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}