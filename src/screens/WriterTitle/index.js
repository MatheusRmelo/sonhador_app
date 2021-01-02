import React, { useState, useEffect, useLayoutEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Heading1, Small, ButtonPrimary, ButtonText, colors, styles } from '../../commonStyles';
import { Modal, ActivityIndicator } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
    Container,
    InputTitle,
    Focus,
    CheckBoxArea,
    ModalArea
} from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import Api from '../../Api';

export default () => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [type, setType] = useState('livro');
    const [title, setTitle] = useState('');

    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    const userId = useSelector(state=>state.user.uid);
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const route = useRoute();

    const handleNewText = async () => {
        if(!title && !toggleCheckBox){
            setShowAlert(true);
        }else{
            setLoading(true);
            let text = {
                title: title ? title : 'Sem título',
                partNumber:1,
                partLabel:'Parte 1',
                category: route.params?.type,
                published:false,
                userId
            };
            const saveBook = await Api.saveBook({...text});
            const texts = await Api.getMyTexts(userId);
            setLoading(false);
            dispatch({type:'SET_MYBOOKS', payload:{texts}});
            navigation.reset({
                routes: [{name: 'Writer'},{name: 'WriterText', params: { textId: saveBook.textId }}]
            });
            //navigation.navigate('WriterPoem',toggleCheckBox ? {title: 'Sem título'} : {title});
            setTitle('');
        }
        
    }

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

    
    return(
        <Container>
            <Modal visible={loading} transparent={true}>
                <ModalArea>
                    <ActivityIndicator size="large" color={colors.primary} />
                </ModalArea>
            </Modal>
            <AwesomeAlert
                show={showAlert}
                showProgress={true}
                title="A obra precisa de um título"
                titleStyle={styles.heading3}
                message="Jovem, marque a opção 'colocar título depois' ou escreva um título"
                messageStyle={styles.small}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                onDismiss={()=>setShowAlert(false)}
                cancelText="Cancelar"
                confirmText="ENTENDIDO"
                confirmButtonColor={colors.danger}
                confirmButtonTextStyle={styles.small_light}
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
            <ButtonPrimary width="80%" height="48px" onPress={handleNewText}>
                <ButtonText color="white">NOVA HISTÓRIA</ButtonText>
            </ButtonPrimary>
        </Container>
    );
}