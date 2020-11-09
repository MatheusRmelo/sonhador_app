import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../commonStyles';

const PoemArea = styled.TouchableOpacity`
    background-color: ${colors.secondary};
    border-radius:8px;
    flex:1;
    height:100px;
    flex-direction:row;
    margin: 16px;
    align-items: center;
    justify-content:space-around;
    padding: 8px;
`;

export default ({children}) => {
    return(
        <PoemArea>
            {children}
        </PoemArea>
    )
}