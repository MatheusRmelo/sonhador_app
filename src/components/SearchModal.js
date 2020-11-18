import React, { useState, useRef, useEffect } from 'react';
import { 
    Modal,
    Keyboard,
    BackHandler,
    Alert 
} from 'react-native';
import styled from 'styled-components/native';
import { useCategory } from '../CategorySVG';

import { Heading2, Small, colors } from '../commonStyles';

import LeftArrowIcon from '../assets/icons/left-arrow.svg';
import MenuIcon from '../assets/icons/menu.svg';



const ModalArea = styled.View`
    flex:1;
    background-color: white;
`;
const ModalHeader = styled.View`
    flex-direction:row;
    border-bottom-width:1px;
    border-bottom-color: #CCC;
    padding: 8px 16px;
    align-items:center;
`;
const Input = styled.TextInput`
    font-size:18px;
    margin-right:24px;
    padding: 8px 16px;
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
export default ({visible, setVisible,placeholder, list}) => {
    const category = useCategory();
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [search, setSearch] = useState('');
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
        <Modal visible={visible} transparent={true}>
            <ModalArea>
                <ModalHeader>
                    <BackButton onPress={()=>setVisible(false)}>
                        <LeftArrowIcon width="24" height="24" fill={colors.gray_2} />
                    </BackButton>
                    <Input value={search} placeholder={placeholder} onChangeText={e=>setSearch(e)} autoFocus={visible} />
                </ModalHeader>
                {
                    list.map((item, key)=>(
                        <ModalItem key={key} onPress={()=>{}}>
                            {category.getCategory(item.category,'24', '24', 'black')}
                            <Information>
                                <Heading2 color="black" >{item.title}</Heading2>
                                <Small color={colors.gray_2}>Última modificação: 12 de set</Small>
                            </Information>
                            <MenuIcon width="24" height="24" fill="black" />
                        </ModalItem>
                    ))
                }
            </ModalArea>
        </Modal>
    );
}