import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Heading1, ButtonText, ButtonPrimary } from '../../commonStyles';

import {
    Container,
    InputPoem,
    Bold,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

export default () => {
    const [poemText, setPoemText] = useState('');
    const navigation = useNavigation();

    return(
        <Container>
            <Heading1 center color="white">Primeira <Bold>Página</Bold></Heading1>
            <InputPoem
                multiline={true}
                numberOfLines={4}
                placeholder="Começe a escrever"
                textAlign="center"
                textAlignVertical="top"
                value={poemText}
                onChangeText={t=>setPoemText(t)}
            />
            <ButtonPrimary height="60px" width="100%">
                <ButtonText color="white">SALVAR</ButtonText>
            </ButtonPrimary>
        </Container>
    );
}