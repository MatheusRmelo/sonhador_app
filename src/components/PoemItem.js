import React from 'react';
import styled from 'styled-components/native';
import { colors, Small } from '../commonStyles';
import { useCategory } from '../CategorySVG';

import MenuIcon from '../assets/icons/menu.svg';


const PoemArea = styled.TouchableOpacity`
    border-radius:8px;
    width:45%;
    align-items: center;
    justify-content:center;
    margin:8px;
    margin-bottom:24px;
`;
const PoemView = styled.View`
    background-color: ${colors.gray_1};    
    width:100%;
    padding:8px;
    border-radius:16px;
    justify-content:center;
    align-items:center;
    margin:8px 0px;
`;
const Poem = styled.View`
    background-color:white;
    width:70%;
    padding:16px;
    align-items:center;
    justify-content:center;
    border-radius:16px;
`;
const PoemBody = styled.Text`
    font-size:3px;
    color:black;
`;
const PoemDesc = styled.View`
    flex-direction:row;
    width:100%;
    justify-content:space-around;
    align-items:center;
`;

const Options = styled.TouchableOpacity`

`;
export default ({poem, setActionVisible}) => {
    const category = useCategory();

    return(
        <PoemArea>
            <PoemView>
                <Poem>
                    <PoemBody>{poem.body}</PoemBody>
                </Poem>
            </PoemView>
            <PoemDesc>
                {category.getCategory(poem.category, '16', '16', 'black')}
                <Small>{poem.title}</Small>
                <Options onPress={()=>setActionVisible()}>
                    <MenuIcon width="16" height="16" fill="black" />
                </Options>
            </PoemDesc>
        </PoemArea>
    )
}