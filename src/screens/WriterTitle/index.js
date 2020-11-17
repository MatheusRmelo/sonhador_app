import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Heading1, Small, ButtonPrimary, ButtonText } from '../../commonStyles';

import {
    Container,
    Question,
    InputTitle,
    Bold,
    CheckBoxArea
} from './styles';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default () => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const navigation = useNavigation();
    
    return(
        <Container>
            <Heading1 center color="white">Vamos lá! antes de tudo qual o <Bold>título do poema?</Bold></Heading1>
            <InputTitle placeholder="Escolha o título" />
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
            <ButtonPrimary width="80%" height="48px" onPress={()=>navigation.navigate('WriterPoem')}>
                <ButtonText color="white">CONTINUAR A HISTÓRIA</ButtonText>
            </ButtonPrimary>

            
        </Container>
    );
}