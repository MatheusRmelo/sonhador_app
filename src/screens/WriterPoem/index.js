import React, { useState, useLayoutEffect, useEffect  } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';


import { Heading2, ButtonText, ButtonPrimary, colors, Small } from '../../commonStyles';
import {
    Container,
    InputPoem,
    Bold,
    OptionsPage,
    ButtonAddPage,
    ButtonAddPageItem,
    ButtonAddPageItemText,
    PartPoem,
    ButtonsOptions,
    ButtonOptionPart,
} from './styles';

import InputModal from '../../components/InputModal';
import AwesomeAlert from 'react-native-awesome-alerts';
import Categories from '../../components/Categories';

import RightArrowIcon from '../../assets/icons/right-arrow.svg';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';
import TrashIcon from '../../assets/icons/trash.svg';
import EditIcon from '../../assets/icons/edit.svg';
import AlignCenterIcon from '../../assets/icons/center-alignment.svg';
import AddIcon from '../../assets/icons/add.svg';




export default () => {
    const [pages, setPages] = useState([{name:'Primeira página',page:1, poem:''}]);
    const [parts, setParts] = useState({label: 'Parte 1', pages:[{page: 1, poem: ``}]});
    const [title, setTitle] = useState('');

    const [currentPart, setCurrentPart] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [action, setAction] = useState('');

    const [visibleInput, setVisibleInput] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);


    const navigation = useNavigation();
    const route = useRoute();

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
        if(i%2===0){
            return title;
        }else{
            return parts.label;
        }
    }

    const handleShowPart = (act) => {
        setAction(act);
        setVisibleInput(true);
    }

    
    useEffect(() => {
        if (route.params?.title) {
            setTitle(route.params?.title);
        }
    }, [route.params?.title]);

   
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Escreva seu poema',
            headerRight: () => (
                <ButtonPrimary width="100%" height="60%" onPress={()=>setCategoryVisible(true)}>
                    <ButtonText>Publicar</ButtonText>
                </ButtonPrimary>
            )
        })
    }, [])

    return(
        <Container>
            <Categories modalVisible={categoryVisible} />
            <InputModal 
                modalVisible={visibleInput} 
                setModalVisible={value=>setVisibleInput(value)} 
                value={action === 'add' ? '':parts.label} 
                titleInput={action === 'add' ? 'Adicionar uma nova parte':'Renomear a parte'} 
                setValue={title=>handleEditPart(title)} 
                action={action} 
                placeholder='' />
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
                <Heading2 center color="white"><Bold>{currentPage % 2 === 0 ? parts.label : title}</Bold></Heading2>
                <ButtonsOptions>
                    <ButtonOptionPart onPress={()=>handleShowPart('rename')}>
                            <EditIcon width="24" height="24" fill="white" />
                    </ButtonOptionPart>
                </ButtonsOptions>
            </PartPoem>
            <InputPoem
                multiline={true}
                numberOfLines={4}
                placeholder="Começe a escrever"
                textAlign="center"
                textAlignVertical="top"
                value={pages[currentPage].poem}
                onChangeText={t=>handleChangePoem(t)}
                scrollEnabled={false}
                maxLength={480}
                
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