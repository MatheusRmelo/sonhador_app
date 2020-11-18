import React, { useState, useEffect, useRef } from 'react';
import { Keyboard } from 'react-native'; 
import styled from 'styled-components/native';


import SearchIcon from '../assets/icons/search.svg';

import { colors, Small } from '../commonStyles';

const SearchArea = styled.View`
    background-color: ${colors.gray_1};
    width:100%;
    height:${props=>props.keyboardOpen? '30%': '20%'};
`;
const SearchClick = styled.TouchableOpacity`
    flex-direction:row;
    padding:16px;
    align-items: center;
`;
const SearchInputArea = styled.View`
    flex-direction:row;
    padding:16px;
    align-items: center;
`;
const Input = styled.TextInput`
    font-size:12px;
    color:black;
    margin-left:16px;
`;

export default ({children, placeholder, input, search, setSearch, onPress}) => {
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const keyboardShowListener = useRef(null);
    const keyboardHideListener = useRef(null);
    useEffect(() => {
        keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
        keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));

        return () => {
            keyboardShowListener.current.remove();
            keyboardHideListener.current.remove();
        }
    });

    return(
        <SearchArea keyboardOpen={keyboardOpen}>
            {
                input ? 
                <SearchInputArea>
                    <SearchIcon width="24" height="24" fill={colors.gray_2} />
                    <Input value={search} onChangeText={t=>setSearch(t)} placeholder={placeholder} placeholderTextColor={colors.gray_2} />
                </SearchInputArea>
                :
                <SearchClick onPress={onPress}>
                    <SearchIcon width="24" height="24" fill={colors.gray_2} />
                    <Small marginLeft="16px" color={colors.gray_2}>{placeholder}</Small>
                </SearchClick>
            }
            
            {children}
        </SearchArea>
    )
}