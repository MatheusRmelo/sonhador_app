import React, { useState, useLayoutEffect  } from 'react';
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
import InputModal from '../../components/InputModal';

import RightArrowIcon from '../../assets/icons/right-arrow.svg';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';
import TrashIcon from '../../assets/icons/trash.svg';
import EditIcon from '../../assets/icons/edit.svg';

import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';

export default () => {
    const [pages, setPages] = useState([{name:'Primeira página',page:1, poem:''}]);
    const [currentPage, setCurrentPage] = useState(0);
    const [visibleInput, setVisibleInput] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const navigation = useNavigation();

    const handleChangePoem = (t) => {
        let newList = [...pages];
        newList[currentPage].poem = t;
        setPages(newList); 
    }
    const handleAddPage = ()=>{
        if( pages.length < currentPage + 2){
            let newList = [...pages];
            newList.push({name:formatOrder(newList.length),page:newList.length,poem:''});
            setPages(newList);
        }
        nextPage();
    }
    const handleDeletePage = () => {
        let newList = [...pages];
        newList = newList.filter((i,k)=>currentPage !== k);
        setPages(newList);
        
        setShowDelete(false);
        prevPage();
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
        setVisibleInput(false);
    }
    const formatOrder = (i) => {
        let list = ['Primeira', 'Segunda', 'Terceira', 'Quarta', 'Quinta', 'Sexta','Setima', 'Oitava', 'Nona', 'Decima'];
        return list[i] + ' Página';
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Escreva seu poema',
            headerRight: () => (
                <ButtonPrimary width="100%" height="60%" onPress={()=>navigation.navigate('EditNote')}>
                    <ButtonText>Publicar</ButtonText>
                </ButtonPrimary>
            )
        })
    }, [])

    return(
        <Container>
            <InputModal modalVisible={visibleInput} setModalVisible={value=>setVisibleInput(value)} value={pages[currentPage].name} setValue={title=>handleChangePage(title)} action="rename-page" placeholder='' />
            <AwesomeAlert
                show={showDelete}
                showProgress={true}
                title="Excluir a página"
                message="Deseja realmente excluir essa página?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Cancelar"
                confirmText="EXCLUIR"
                confirmButtonColor={colors.danger}
                onCancelPressed={() => {
                    setShowDelete(false);
                }}
                onConfirmPressed={handleDeletePage}
            />
            <PartPoem>
                <Heading1 center color="white"><Bold>{pages[currentPage].name}</Bold></Heading1>
                <ButtonOptionPart onPress={()=>setVisibleInput(true)}>
                        <EditIcon width="24" height="24" fill="white" />
                </ButtonOptionPart>
                {
                    currentPage > 0
                    &&
                    <ButtonOptionPart onPress={()=>setShowDelete(true)}>
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
            
           
        </Container>
    );
}