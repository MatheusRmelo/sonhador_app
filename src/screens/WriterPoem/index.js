import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Heading1, Small } from '../../commonStyles';

import {
    Container,
    Question,
    InputTitle,
    Bold,
    CheckBoxArea
} from './styles';

export default () => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return(
        <Container>
            <Heading1 center color="white">Vamos lá! antes de tudo qual o <Bold>título do poema?</Bold></Heading1>
            <InputTitle placeholder="Escolha o título" />
            <CheckBoxArea>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Small color="white">Colocar título depois</Small>
            </CheckBoxArea>

            
        </Container>
    );
}