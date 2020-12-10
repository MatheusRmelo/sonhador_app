import React, { useEffect } from 'react';
import {
    Container 
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

export default ()=>{
    const navigation = useNavigation();
    //TODO - configurar async storage
    useEffect(()=>{
        setTimeout(()=>{
            let token = ''
            if(token){
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
