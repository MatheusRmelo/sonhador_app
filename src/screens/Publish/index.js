import React, { useState } from 'react';
import {
    Container,
    CheckBoxArea
} from './styles';

import { Heading1, Heading2, ButtonPrimary, ButtonText, Small } from '../../commonStyles';
import CheckBox from '@react-native-community/checkbox';
import Categories from '../../components/Categories';


export default () => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    return(
        <Container>
            <Categories modalVisible={false} />
            <Heading1 color="white">Tudo feito vamos publicar!</Heading1>
            <CheckBoxArea>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Small marginLeft="16px" color="white">Postar como anônimo</Small>
            </CheckBoxArea>
            <CheckBoxArea>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Small marginLeft="16px" color="white">Contém contéudo adulto</Small>
            </CheckBoxArea>

            <ButtonPrimary width="100%" height="48px">
                <ButtonText color="white">PUBLICAR</ButtonText>
            </ButtonPrimary>
        </Container>
    );
}
