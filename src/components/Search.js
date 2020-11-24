import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { 
    Modal,
    Keyboard,
    BackHandler,
    Alert 
} from 'react-native';
import styled from 'styled-components/native';
import { useCategory } from '../CategorySVG';

import { Heading2, Small, colors } from '../commonStyles';

import { PoemApi } from '../PoemApi';


import LeftArrowIcon from '../assets/icons/arrow.svg';
import MenuIcon from '../assets/icons/menu.svg';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';



const Container = styled.View`
    flex:1;
    background-color: white;
`;
const Header = styled.View`
    flex-direction:row;
    border-bottom-width:1px;
    border-bottom-color: #CCC;
    padding: 8px 16px;
    align-items:center;
    margin-bottom:16px;
    height:64px;
`;
const Input = styled.TextInput`
    font-size:16px;
    margin-right:24px;
    padding: 8px 16px;
    font-family: 'Fredoka One';
    width:80%;
`;
const BackButton = styled.TouchableOpacity`
`;
const ModalItem = styled.TouchableOpacity`
    width:100%;
    padding:8px;
    flex-direction:row;
    align-items:center;
`;
const Information = styled.View`
    margin:0px 16px;
    flex:1;
`;
const Title = styled.Text`
`;
const ButtonOption = styled.TouchableOpacity``;

export default ({visible, setVisible,placeholder, list, setShowOption}) => {
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [poem, setPoem] = useState(PoemApi);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const category = useCategory();
    const navigation = useNavigation();
    const keyboardShowListener = useRef(null);
    const keyboardHideListener = useRef(null);

    useEffect(() => {
        keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => dispatch({type:'SET_VISIBLE', payload:{visible:false}}));
        keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => dispatch({type:'SET_VISIBLE', payload:{visible:true}}));

        return () => {
            keyboardShowListener.current.remove();
            keyboardHideListener.current.remove();
        }
    });

    return(
        <Container>
            <Header>
                <BackButton onPress={()=>navigation.goBack()}>
                    <LeftArrowIcon width="24" height="24" fill={colors.gray_2} />
                </BackButton>
                <Input value={search} placeholder={placeholder} onChangeText={e=>setSearch(e)} autoFocus={true} />
            </Header>
            {
                poem.map((item, key)=>(
                    <ModalItem key={key} onPress={()=>{}}>
                        {category.getCategory(item.category,'24', '24', 'black')}
                        <Information>
                            <Heading2 color="black" >{item.title}</Heading2>
                            <Small color={colors.gray_2}>Última modificação: 12 de set</Small>
                        </Information>
                        <ButtonOption onPress={()=>setShowOption(key)}>
                            <MenuIcon width="24" height="24" fill="black"  />
                        </ButtonOption>
                    </ModalItem>
                ))
            }
        </Container>
        
    );
}