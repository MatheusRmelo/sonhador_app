import React, { useState } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { colors, Small } from '../commonStyles';
import { useCategory } from '../CategorySVG';

const Container = styled.View`
    background-color:white;
    flex:1;
`;
const CategoryList = styled.ScrollView`
    padding:16px;
    margin-bottom:9%;
`;
const CategoryArea = styled.View`
    flex-wrap:wrap;
    flex-direction:row;
`;
const Category = styled.TouchableOpacity`
    width:45%;
    height:10%;
    background-color: ${colors.primary_1};
    justify-content:center;
    align-items:center;
    margin:8px;
    border-radius:16px;
    padding:8px;
`;
export default ({modalVisible, setModalVisible}) => {
    const [categories, setCategories] = useState([
        {name:'science fiction'},
        {name:'love'},
        {name:'science fiction'},
        {name:'love'},
        {name:'science fiction'},
        {name:'love'},
        {name:'science fiction'},
        {name:'love'},
        {name:'science fiction'},
        {name:'love'},
        {name:'science fiction'},
        {name:'love'},
        {name:'science fiction'},
        {name:'love'},
        {name:'science fiction'},
        {name:'love'},
    ]);
    const category = useCategory();

    return(
        <Modal visible={modalVisible}>
            <Container>
                <CategoryList>
                    <CategoryArea>
                        {
                            categories.map((item, key)=>(
                                <Category key={key}>
                                        {category.getCategory(item.name, '48','48','black')}
                                        <Small color="white">{item.name}</Small>
                                </Category>
                            ))
                        }
                    </CategoryArea>
                </CategoryList>
            </Container>
        </Modal>
    )
}
