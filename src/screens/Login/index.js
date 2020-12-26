import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';


import { Heading1, Heading2 } from '../../commonStyles';
import {
    Container,
    Header,
    LoginGmail,
    LoginGmailText,
    Message,
    Logo,
    Terms,
    TermsAction,
    TermsActionText,
    TermsText,
    TermsArea
} from './styles';

import BookLover from '../../assets/book_lover.svg';
import GoogleIcon from '../../assets/icons/google.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Api from '../../Api';



export default ()=>{
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const userId = useSelector(state=>state.user.uid);
    const userEmail = useSelector(state=>state.user.email);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    async function onAuthStateChanged(user) {
        setUser(user);
        //console.log(user);
        if(user){
            await Api.firstUse(user.uid,user.displayName);
            dispatch({
                type:'LOGIN',
                payload:{
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid
                }
            });
        }
        
        if (initializing) setInitializing(false);
    }

    async function onGoogleButtonPress() {
        Api.loginGmail();
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);

    useEffect(()=>{   
        if(userId){
            navigation.reset({
                routes: [{name: 'MainTab'}]
            });
        }
       
    },[userId]);

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
            <LoginGmail onPress={onGoogleButtonPress}>
                <>
                    <GoogleIcon width="32" height="32" fill="red"/>
                    <LoginGmailText>Entrar com Google</LoginGmailText>
                </>
            </LoginGmail>
            <Terms>
                <TermsText>Ao fazer login, você concorda com nossa </TermsText>
                <TermsArea>
                    <TermsAction>
                        <TermsActionText>Política de privacidade</TermsActionText>
                    </TermsAction>
                    <TermsText>
                        e
                    </TermsText>
                    <TermsAction>
                        <TermsActionText>Termos de serviço</TermsActionText>
                    </TermsAction>
                </TermsArea>
             </Terms>
        </Container>
    );
}