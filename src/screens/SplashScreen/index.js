import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
    Container 
} from './styles';
import { Text } from 'react-native';


export default ()=>{
    const navigation = useNavigation();
    const userId = useSelector(state=>state.user.uid);
    
    useEffect(()=>{
        setTimeout(()=>{
            if(userId){
                navigation.reset({
                    routes: [{name: 'MainTab'}]
                });
            }else{
                navigation.reset({
                    routes: [{name: 'Login'}]
                });
            }
        }, 1000);
    },[]);

    return(
        <Container>
            <Text>SPLASH SCREEN</Text>
        </Container>
    );
}
