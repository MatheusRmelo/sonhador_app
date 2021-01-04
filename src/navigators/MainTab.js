import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Writer from '../screens/Writer';
import WriterStack from './WriterStack';
import Library from '../screens/Library';
import Profile from '../screens/Profile';

import CustomTabBar from '../components/CustomTabBar';

const MainTab = createBottomTabNavigator();

export default ()=>(
    <MainTab.Navigator tabBar={props=><CustomTabBar {...props} />}>
        <MainTab.Screen name="WriterStack" component={WriterStack} />
        <MainTab.Screen name="Home" component={Home} />
        <MainTab.Screen name="Search" component={Search} />
        {/* <MainTab.Screen name="WriterStack" component={WriterStack} /> */}
        <MainTab.Screen name="Library" component={Library} />
        <MainTab.Screen name="Profile" component={Profile} />
    </MainTab.Navigator>
);