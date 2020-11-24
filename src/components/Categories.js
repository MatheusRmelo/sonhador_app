import React, { useState } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { colors, Small, Heading2, ButtonPrimary, ButtonText } from '../commonStyles';
import { useCategory } from '../CategorySVG';

import CloseIcon from '../assets/icons/close.svg';

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
export default ({modalVisible, setModalVisible}) => {
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
    const category = useCategory();

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

    return(
        <Modal visible={modalVisible}>
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
                    <ButtonPrimary disabled={!enabled} style={{backgroundColor: enabled ? colors.secondary : colors.light_1}} width="80%" height="40%" rounded="60px">
                        <ButtonText>PUBLICAR</ButtonText>
                    </ButtonPrimary>
                </ButtonArea>
            </Container>
        </Modal>
    )
}
