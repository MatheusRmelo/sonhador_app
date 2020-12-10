import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

import { Heading1, Heading2 } from '../../commonStyles';
import {
    Container,
    Header,
    LoginGmail,
    LoginGmailText,
    Message,
    Logo
} from './styles';

import api from '../../api';


import BookLover from '../../assets/book_lover.svg';
import GoogleIcon from '../../assets/icons/google.svg';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';



export default ()=>{
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const dispatch = useDispatch();
    const navigation = useNavigation();

    function onAuthStateChanged(user) {
        setUser(user);
        dispatch({
            type:'LOGIN',
            payload:{user}
        });
        if (initializing) setInitializing(false);
    }

    useEffect(()=>{
        if(user){
            navigation.navigate('MainTab');
        }
    }, [user]);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    

    if (initializing) return null;

    return(
        <Container>
            <Header>
                <Logo>Sonhador</Logo>
                <Message>
                    Compartilhe 
                    suas histórias
                </Message>
            </Header>
            <BookLover width="100%" height="50%" fill='white'/>
            <LoginGmail onPress={()=>api.login()}>
                <>
                    <GoogleIcon width="32" height="32" fill="red"/>
                    <LoginGmailText>Entrar com Google</LoginGmailText>
                </>
            </LoginGmail>
        </Container>
    );
}