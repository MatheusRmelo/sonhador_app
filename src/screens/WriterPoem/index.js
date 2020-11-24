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
    const [parts, setParts] = useState({label: 'Parte 1', pages:[{page: 1, poem: ``}]});
    const [title, setTitle] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const [action, setAction] = useState('');

    const [visibleInput, setVisibleInput] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);


    const navigation = useNavigation();
    const route = useRoute();

    const handleChangePoem = (t) => {
        let newList = {...parts};
        newList.pages[currentPage].poem = t;
        setParts(newList); 
    }
    const handleAddPage = ()=>{
        if(parts.pages.length < currentPage + 2){
            let newList = {...parts};
            newList.pages.push({page:currentPage+2,poem:``});
            setParts(newList); 
        }

        nextPage();
    }
    const handleDeletePage = (prevPage = true) => {
        let newList = {...parts};
        newList.pages = newList.pages.filter((i,k)=>k!==currentPage);
        setParts(newList);
    
        if(prevPage){
            prevPage();
        }
        
    }
    const nextPage = () => {
        setCurrentPage(prevState=>prevState+1);
    }
    const prevPage = () => {
        if(currentPage > 0){
            if(!parts.pages[currentPage].poem){
                handleDeletePage(false);
            }
            setCurrentPage(prevState=>prevState-1);
        }
        
    }

    const handleShowPart = (act) => {
        setAction(act);
        setVisibleInput(true);
    }

    const handleEditTitleOrPart = (newTitle) => {
        if(currentPage%2===0){
            let newList = {...parts};
            newList.label = newTitle;
            setParts(newList); 
        }else{
            setTitle(newTitle);
        }
        setVisibleInput(false);
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
            <Categories modalVisible={categoryVisible} setModalVisible={value=>setCategoryVisible(value)} />
            <InputModal 
                modalVisible={visibleInput} 
                setModalVisible={value=>setVisibleInput(value)} 
                value={currentPage % 2 === 0 ? parts.label : title} 
                titleInput={currentPage % 2 === 0 ?  'Renomear a parte':'Renomear o título'} 
                setValue={handleEditTitleOrPart} 
                action={action} 
                placeholder='' />
            <PartPoem>
                <Heading2 center color="white"><Bold>{currentPage % 2 === 0 ? parts.label : title}</Bold></Heading2>
                <Small color="white">{`${currentPage+1}/${parts.pages.length}`}</Small>
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
                value={parts.pages[currentPage].poem}
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
                        parts.pages.length < currentPage + 2
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