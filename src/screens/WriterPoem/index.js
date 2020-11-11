import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Heading1, ButtonText, ButtonPrimary, colors } from '../../commonStyles';
import {
    Container,
    InputPoem,
    Bold,
    OptionsPage,
    ButtonAddPage,
    ButtonAddPageItem,
    ButtonAddPageItemText,
    PartPoem,
    ButtonDelPage
} from './styles';

import RightArrowIcon from '../../assets/icons/right-arrow.svg';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';
import TrashIcon from '../../assets/icons/trash.svg';

import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

export default () => {
    const [pages, setPages] = useState([{page:1, poem:''}]);
    const [currentPage, setCurrentPage] = useState(0);
    const navigation = useNavigation();

    const handleChangePoem = (t) => {
        let newList = [...pages];
        newList[currentPage].poem = t;
        setPages(newList); 
    }
    const handleAddPage = ()=>{
        if( pages.length < currentPage + 2){
            let newList = [...pages];
            newList.push({page:newList.length+1,poem:''});
            setPages(newList);
        }
        nextPage();
    }
    const nextPage = () => {
        setCurrentPage(prevState=>prevState+1);
    }
    const prevPage = () => {
        if(currentPage > 0){
            setCurrentPage(prevState=>prevState-1);
        }
        
    }
    const formatOrder = (i) => {
        let list = ['Primeira', 'Segunda', 'Terceira', 'Quarta', 'Quinta', 'Sexta','Setima', 'Oitava', 'Nona', 'Decima'];
        return list[i] + ' Página';
    }

    return(
        <Container>
            <PartPoem>
                <Heading1 center color="white"><Bold>{formatOrder(currentPage)}</Bold></Heading1>
                {
                    currentPage > 0
                    &&
                    <ButtonDelPage>
                        <TrashIcon width="24" height="24" fill="red" />
                    </ButtonDelPage>
                }
            </PartPoem>
            <InputPoem
                multiline={true}
                numberOfLines={4}
                placeholder="Começe a escrever"
                textAlign="center"
                textAlignVertical="top"
                value={pages[currentPage].poem}
                onChangeText={t=>handleChangePoem(t)}
            />
            <OptionsPage position="left">
                <ButtonAddPage onPress={prevPage}>
                    <LeftArrowIcon width="24" height="24" fill="white" />
                </ButtonAddPage>
            </OptionsPage>
            <OptionsPage position="right">
                <ButtonAddPage onPress={handleAddPage}>
                    <RightArrowIcon width="24" height="24" fill="white" />
                    {
                        pages.length < currentPage + 2
                        &&
                        <ButtonAddPageItem>
                            <ButtonAddPageItemText>+</ButtonAddPageItemText>
                        </ButtonAddPageItem>
                    }
                    
                </ButtonAddPage>
            </OptionsPage>
            
            <ButtonPrimary height="60px" width="100%">
                <ButtonText color="white">SALVAR</ButtonText>
            </ButtonPrimary>
        </Container>
    );
}