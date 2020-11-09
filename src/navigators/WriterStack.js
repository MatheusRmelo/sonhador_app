import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WriterPoem from '../screens/WriterPoem';
import Writer from '../screens/Writer';
// import AuthStack from './AuthStack';

const WriterStack = createStackNavigator();

export default () => (
    <WriterStack.Navigator
        initialRouteName="Writer"
    >
        <WriterStack.Screen options={{headerShown:false}} name="Writer" component={Writer} />
        <WriterStack.Screen options={{title:'Escreva seu poema'}} name="WriterPoem" component={WriterPoem} />
    </WriterStack.Navigator>
)
