import React, { useState, useEffect, useLayoutEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Heading1, Small, ButtonPrimary, ButtonText, colors } from '../../commonStyles';

import AwesomeAlert from 'react-native-awesome-alerts';

import {
    Container,
    Question,
    InputTitle,
    Focus,
    CheckBoxArea
} from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

export default () => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [type, setType] = useState('livro');
    const [title, setTitle] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const titleOld = '';//useSelector(state=>state.book.title);
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const route = useRoute();

    useEffect(()=>{
        if(titleOld !== '') {
            navigation.reset({
                routes: [{name: 'Writer'}]
            }); 
        }
    }, [titleOld])

    useEffect(() => {
        if (route.params?.type) {
           if(route.params?.type === 'poem'){
               setType('poema');
           }else 
           if(route.params?.type === 'cordel'){
                setType('cordel');
           }else{
                setType('livro');
           }
        }
    }, [route.params?.type]);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: `Escreva seu ${route.params?.type === 'poem' ? 'poema': route.params?.type === 'cordel' ? 'cordel': 'livro'}`
        })
    }, [route.params?.type]);

    const handleGoWriter = () => {
        if(route.params?.type === 'poem'){
            if(!title && !toggleCheckBox){
                setShowAlert(true);
            }else{
                dispatch({type:'SET_TITLE', payload:{title}});
                navigation.navigate('WriterPoem',toggleCheckBox ? {title: 'Sem título'} : {title});
                setTitle('');
            }
            
        }
    }
    
    return(
        <Container>
            <AwesomeAlert
                show={showAlert}
                showProgress={true}
                title="A obra precisa de um título"
                message="Amigo, marque a opção colocar título depois ou escreva um título"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                cancelText="Cancelar"
                confirmText="ENTENDIDO"
                confirmButtonColor={colors.danger}
                onCancelPressed={() => {}}
                onConfirmPressed={()=>setShowAlert(false)}
            />
            <Heading1 center color="white">Vamos lá! antes de tudo qual o <Focus>título do {type}?</Focus></Heading1>
            <InputTitle value={title} onChangeText={t=>setTitle(t)} placeholder="Escolha o título" />
            <CheckBoxArea>
                <CheckBox
                    boxType="circle"
                    onTintColor="#000000"
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Small color="white">Colocar título depois</Small>
            </CheckBoxArea>
            <ButtonPrimary width="80%" height="48px" onPress={handleGoWriter}>
                <ButtonText color="white">CONTINUAR A HISTÓRIA</ButtonText>
            </ButtonPrimary>

            
        </Container>
    );
}