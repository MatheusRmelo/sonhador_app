import React, { useState } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { colors, Small } from '../commonStyles';


const Container = styled.View`
    flex:1;
    background-color:white;
    padding:16px;
`;
const CategoryList = styled.ScrollView`
    flex-wrap:wrap;
    flex:1;
    background-color:red;
    flex-direction:row;
`;
const Category = styled.TouchableOpacity`
    width:50%;
    background-color: ${colors.gray_1};
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    
`;
export default ({modalVisible, setModalVisible}) => {
    const [categories, setCategories] = useState([
        {name:'Aventura'},
        {name:'Amor'}
    ]);

    return(
        <Modal visible={modalVisible}>
            <Container>
                <CategoryList>
                    {
                        categories.map((item, key)=>(
                            <Category key={key}>
                                <Small>{item.name}</Small>
                            </Category>
                        ))
                    }
                </CategoryList>
            </Container>
        </Modal>
    )
}
