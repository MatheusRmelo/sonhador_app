import React from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { useDispatch } from 'react-redux';

import {
    Container
} from './styles';

import { Button, Text } from 'react-native';
import Api from '../../Api';


export default () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch({
            type:'LOGOUT',
            payload:{}
        });
        await Api.logout();
        navigation.navigate('SplashScreen');
    }
    return( 
        <Container>
            <Text>SCREEN PROFILE</Text>
            <Button title="Logout" onPress={handleLogout} />
        </Container>
    );
}
