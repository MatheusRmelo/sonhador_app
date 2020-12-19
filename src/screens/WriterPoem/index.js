import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';


import { Heading2, ButtonText, ButtonPrimary, colors, Small } from '../../commonStyles';
import {
    Container,
    InputPoem,
    Bold,
    ModalArea,
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
import PhotoBook from '../../components/PhotoBook';

import { ActivityIndicator, Keyboard, Modal } from 'react-native';


import RightArrowIcon from '../../assets/icons/right-arrow.svg';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';
import TrashIcon from '../../assets/icons/trash.svg';
import EditIcon from '../../assets/icons/edit.svg';
import AlignCenterIcon from '../../assets/icons/center-alignment.svg';
import AddIcon from '../../assets/icons/add.svg';

import { useDispatch, useSelector } from 'react-redux';
import Api from '../../api';

let timer;

export default () => {
    const [parts, setParts] = useState({label:'Parte 1', pages:[{page: 1, poem: ``}]});
    const [title, setTitle] = useState('');
    const [saved, setSaved] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const [action, setAction] = useState('');

    const [visibleInput, setVisibleInput] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [photoBookVisible, setPhotoBookVisible] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const books = useSelector(state=>state.book);
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

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
        setVisibleInput(true);
        setAction(act);
    }
    const handleEditTitleOrPart = async (newTitle) => {
        setLoading(true);
        if(currentPage%2===0){
            updateBook({partLabel: newTitle});
            let newParts = {...parts};
            newParts.label = newTitle;
            setParts(newParts);
        }else{
            updateBook({title: newTitle});
            setTitle(newTitle);
        }
        setLoading(false);
        setVisibleInput(false);
    }
    const _keyboardDidShow = () => {
        setKeyboardVisible(true);
        dispatch({type: 'SET_VISIBLE', payload:{visible: false}});
    };
    const _keyboardDidHide = () => { 
        setKeyboardVisible(false);
        dispatch({type: 'SET_VISIBLE', payload:{visible: true}});
    };
    const onSavePhoto = (value) => {
        setCategoryVisible(value);
        setPhotoBookVisible(!value);
    }
    const onSaveBook = async () => {
        updateBook({pages: parts.pages});
    }
    const updateBook  = async (changes)=>{
        let id = route.params?.bookId;
        const updated = await Api.updateBook(id, {...changes});
        if(updated){
            setSaved('- salvo');
        }else{
            setSaved('- erro ao salvar');
        }
    }
    const getBookById = async (id) => {
        setLoading(true);
        const result = await Api.getBookById(id);
        setParts({
            label: result.partLabel,
            pages: result.pages ? result.pages : [{page: 1, poem: ``}]
        });
        setTitle(result.title);
        setLoading(false);
    }
    useEffect(()=>{
        setSaved('- salvando...');
        if(timer){
            clearTimeout(timer);
        }

        timer = setTimeout(onSaveBook, 2000);
    }, [parts.pages[currentPage].poem]);

    useEffect(() => {
        if(route.params?.bookId){
            getBookById(route.params?.bookId);
        }
    }, [route.params?.bookId]);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    
        // cleanup function
        return () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);
   
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Escreva seu poema',
            headerRight: () => (
                <ButtonPrimary width="100%" height="60%" onPress={()=>setPhotoBookVisible(true)}>
                    <ButtonText>Publicar</ButtonText>
                </ButtonPrimary>
            )
        })
    }, []);

   

    return(
        <Container>
            <Categories modalVisible={categoryVisible} setModalVisible={value=>setCategoryVisible(value)} bookId={route.params?.bookId} />
            <PhotoBook modalVisible={photoBookVisible} setModalVisible={value=>setPhotoBookVisible(value)} onSave={onSavePhoto} bookId={route.params?.bookId} />
            <Modal visible={loading} transparent={true}>
                <ModalArea>
                    <ActivityIndicator size="large" color={colors.primary}/>
                </ModalArea>
            </Modal>
            <InputModal 
                modalVisible={visibleInput} 
                setModalVisible={value=>setVisibleInput(value)} 
                value={currentPage % 2 === 0 ? parts.label : title} 
                titleInput={currentPage % 2 === 0 ?  'Renomear a parte':'Renomear o título'} 
                setValue={handleEditTitleOrPart} 
                action={action} 
                placeholder=''
                height={keyboardVisible ? '45%' : '30%'}
            />
            <PartPoem>
                <Heading2 center color="white"><Bold>{currentPage % 2 === 0 ? parts.label : title}</Bold></Heading2>
                <Small color="white">{`${currentPage+1}/${parts.pages.length}`} {saved}</Small>
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