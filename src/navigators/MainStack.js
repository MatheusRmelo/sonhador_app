import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import MainTab from './MainTab';
// import AuthStack from './AuthStack';

const MainStack = createStackNavigator();

export default () => (
    <MainStack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
            headerShown: false
        }}
    >
        <MainStack.Screen name="SplashScreen" component={SplashScreen} />
        <MainStack.Screen name="MainTab" component={MainTab} />
    </MainStack.Navigator>
)
