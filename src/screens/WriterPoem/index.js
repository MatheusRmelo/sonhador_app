import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Heading1, ButtonText, ButtonPrimary, colors, Small } from '../../commonStyles';
import {
    Container,
    InputPoem,
    Bold,
    OptionsPage,
    ButtonAddPage,
    ButtonAddPageItem,
    ButtonAddPageItemText,
    PartPoem,
    ButtonOptionPart,
    ModalArea,
    ModalContainer,
    ModalInput,
    ButtonCloseModal,
    ButtonClose,
    ButtonCloseText
} from './styles';

import RightArrowIcon from '../../assets/icons/right-arrow.svg';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';
import TrashIcon from '../../assets/icons/trash.svg';
import EditIcon from '../../assets/icons/edit.svg';

import { useNavigation } from '@react-navigation/native';
import { Modal, Text } from 'react-native';

export default () => {
    const [pages, setPages] = useState([{name:'Primeira página',page:1, poem:''}]);
    const [currentPage, setCurrentPage] = useState(0);
    const [visibleInput, setVisibleInput] = useState(false);
    const navigation = useNavigation();

    const handleChangePoem = (t) => {
        let newList = [...pages];
        newList[currentPage].poem = t;
        setPages(newList); 
    }
    const handleAddPage = ()=>{
        if( pages.length < currentPage + 2){
            let newList = [...pages];
            newList.push({name:formatOrder(newList.length+1),page:newList.length+1,poem:''});
            setPages(newList);
        }
        nextPage();
    }
    const handleDeletePage = () => {
        if( pages.length < currentPage + 2){
            let newList = [...pages];
            newList = newList.filter((i,k)=>currentPage !== k);
            setPages(newList);
        }
        prevPage();
    }
    const handleEditPage = () => {

    }
    const nextPage = () => {
        setCurrentPage(prevState=>prevState+1);
    }
    const prevPage = () => {
        if(currentPage > 0){
            setCurrentPage(prevState=>prevState-1);
        }
        
    }
    const handleChangePage = (t) => {
        let newList = [...pages];
        newList[currentPage].name = t;
        setPages(newList);
    }
    const formatOrder = (i) => {
        let list = ['Primeira', 'Segunda', 'Terceira', 'Quarta', 'Quinta', 'Sexta','Setima', 'Oitava', 'Nona', 'Decima'];
        return list[i] + ' Página';
    }

    return(
        <Container>
            <Modal visible={visibleInput} transparent={true}>
                <ModalArea>
                    <ModalContainer>
                        <ButtonClose onPress={()=>setVisibleInput(false)}>
                            <ButtonCloseText>X</ButtonCloseText>
                        </ButtonClose>
                        <Heading1 center>Nome da página</Heading1>
                        <ModalInput value={pages[currentPage].name} onChangeText={t=>handleChangePage(t)} placeholder="Escolha o nome da página" />
                        <ButtonPrimary height="40px" width="70%" onPress={()=>setVisibleInput(false)}>
                            <ButtonText color="white">SALVAR</ButtonText>
                        </ButtonPrimary>
                        <ButtonCloseModal onPress={()=>setVisibleInput(false)}>
                            <Small color="blue">Sair</Small>
                        </ButtonCloseModal>
                    </ModalContainer>
                </ModalArea>
            </Modal>
            <PartPoem>
                <Heading1 center color="white"><Bold>{pages[currentPage].name}</Bold></Heading1>
                <ButtonOptionPart onPress={()=>setVisibleInput(true)}>
                        <EditIcon width="24" height="24" fill="white" />
                </ButtonOptionPart>
                {
                    currentPage > 0
                    &&
                    <ButtonOptionPart onPress={handleDeletePage}>
                        <TrashIcon width="24" height="24" fill="red" />
                    </ButtonOptionPart>
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
            
            <ButtonPrimary height="60px" width="100%" onPress={()=>navigation.navigate('Publish')}>
                <ButtonText color="white">SALVAR</ButtonText>
            </ButtonPrimary>
        </Container>
    );
}