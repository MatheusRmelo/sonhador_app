import React, { useState } from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import styled from 'styled-components/native';
import { colors, Small, Heading2, ButtonPrimary, ButtonText } from '../commonStyles';

import useIcons from '../utils/Icons';
import Api from '../Api';

import CloseIcon from '../assets/icons/close.svg';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.View`
    background-color:white;
    flex:1;
    align-items:center;
`;
const CategoryList = styled.ScrollView`
    padding:16px;
`;
const CategoryArea = styled.View`
    flex-wrap:wrap;
    flex-direction:row;
`;
const Category = styled.TouchableOpacity`
    width:45%;
    height:10%;
    background-color: ${props=>props.selected ? colors.primary_1 : colors.gray_1};
    justify-content:center;
    align-items:center;
    margin:8px;
    border-radius:16px;
    padding:8px;
`;
const ButtonArea = styled.View`
    background-color: ${colors.primary_1};
    align-items:center;
    justify-content:center;
    height:15%;
    width:100%;
`;
const CloseButton = styled.TouchableOpacity`
    position:absolute;
    top:16px;
    right:16px;
    align-items:center;
    justify-content:center;
`;
const LoadingArea = styled.View`
    background-color: rgba(0,0,0,0.5);
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
`;
export default ({modalVisible, setModalVisible, bookId}) => {
    const [categories, setCategories] = useState([
        {name:'science fiction', selected: false},
        {name:'love', selected: false},
        {name:'science fiction', selected: false},
        {name:'love', selected: false},
        {name:'science fiction', selected: false},
        {name:'love', selected: false},
        {name:'science fiction', selected: false},
        {name:'love', selected: false},
        {name:'science fiction', selected: false},
        {name:'love', selected: false},
        {name:'science fiction', selected: false},
        {name:'love', selected: false},
        {name:'science fiction', selected: false},
        {name:'love', selected: false},
        {name:'science fiction', selected: false},
        {name:'love', selected: false},
    ]);
    const [enabled, setEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const icons = useIcons();
    const navigation = useNavigation();
    const userId = useSelector(state=>state.user.uid);
    const dispatch = useDispatch();

    const handleClickCategory = (key) => {
        let newList = [...categories];
        newList[key].selected = !newList[key].selected;
        setCategories(newList);
        let valid = categories.findIndex((item, index)=>item.selected);
        if(valid > -1){
            setEnabled(true);
        }else{
            setEnabled(false);
        }
    }
    const getMyBooks = async () => {
        let result = await Api.getMyTexts(userId);
        dispatch({
            type: 'SET_MYBOOKS',
            payload:{
                books:result
            }
        });
    }

    const publishPoem = async () => {
        setLoading(true);
        let listSelected = [];
        for (let i in categories){
            if(categories[i].selected){
                listSelected.push(categories[i].name);
            }
        }
        let result = await Api.updateBook(bookId, {categories:listSelected, published: true});
        getMyBooks();
        setLoading(false);
        navigation.navigate('Writer');
    }

    return(
        <Modal visible={modalVisible}>
            <Modal transparent={true} visible={loading} >
                <LoadingArea>
                    <ActivityIndicator size="large" color="#00ff00" />
                </LoadingArea>
            </Modal>
           
            <Container>
                <CloseButton onPress={()=>setModalVisible(false)}>
                    {icons.getIcons('close',24,24,'black')}
                </CloseButton>
                <Heading2 margin="64px 16px 0px 0px">Selecione as categorias de sua obra</Heading2>
                <CategoryList>
                    <CategoryArea>
                        {
                            categories.map((item, key)=>(
                                <Category key={key} selected={item.selected} onPress={()=>handleClickCategory(key)}>
                                        {icons.getIcons(item.name, '48','48','black')}
                                        <Small color="white">{item.name}</Small>
                                </Category>
                            ))
                        }
                    </CategoryArea>
                </CategoryList>
                <ButtonArea>
                    <ButtonPrimary onPress={publishPoem} disabled={!enabled} style={{backgroundColor: enabled ? colors.secondary : colors.light_1}} width="80%" height="40%" rounded="60px">
                        <ButtonText>PUBLICAR</ButtonText>
                    </ButtonPrimary>
                </ButtonArea>
            </Container>
        </Modal>
    )
}
