import React, { useState } from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import styled from 'styled-components/native';
import { colors, Small, Heading2, ButtonPrimary, ButtonText } from '../commonStyles';

import { useCategory } from '../CategorySVG';
import Api from '../api';


import CloseIcon from '../assets/icons/close.svg';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

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
const CloseButtonText = styled.Text``;
const LoadingArea = styled.View`
    background-color: rgba(0,0,0,0.5);
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
`;
export default ({modalVisible, setModalVisible, book}) => {
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

    const category = useCategory();
    const navigation = useNavigation();
    const userId = useSelector(state=>state.user.uid);

    const handleSelectCategory = (key) => {
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

    const publishPoem = async () => {
        setLoading(true);
        let {parts, title} = book;
        let listSelected = [];
        for (let i in categories){
            if(categories[i].selected){
                listSelected.push(categories[i].name);
            }
        }
        let result = await Api.saveBook({userId,ads:true,part:parts.label, pages:parts.pages, title, categories:listSelected});
        setLoading(false);
        if(result.error !== ''){
            alert('ERRO:'+result.error);
            return;
        }
        navigation.navigate('Writer');
        //console.log(json);

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
                    <CloseIcon width="24" height="24" fill="black" />
                </CloseButton>
                <Heading2 margin="64px 16px 0px 0px">Selecione as categorias de sua obra</Heading2>
                <CategoryList>
                    <CategoryArea>
                        {
                            categories.map((item, key)=>(
                                <Category key={key} selected={item.selected} onPress={()=>handleSelectCategory(key)}>
                                        {category.getCategory(item.name, '48','48','black')}
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
