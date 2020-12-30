import React, { useState, useLayoutEffect, useEffect } from 'react';

import { Heading2, ButtonText, ButtonPrimary, colors, Small, styles } from '../../commonStyles';
import {
    Container,
    InputText,
    Bold,
    ModalArea,
    OptionsPage,
    ButtonAddPage,
    ButtonAddPageItem,
    ButtonAddPageItemText,
    PartTextArea,
    ButtonsOptions,
    ButtonOptionPart,
    OptionBook,
    OptionItem,
    OptionTextArea,
    ImageArea,
    Photo
} from './styles';
import InputModal from '../../components/InputModal';
import Categories from '../../components/Categories';
import PhotoBook from '../../components/PhotoBook';
import { ActivityIndicator, Keyboard, Modal } from 'react-native';

import CameraIcon from '../../assets/icons/camera.svg';
import AdsIcon from '../../assets/icons/ads.svg';
import SharedIcon from '../../assets/icons/share.svg';
import GalleryIcon from '../../assets/icons/gallery.svg';
import RightArrowIcon from '../../assets/icons/right-arrow.svg';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';
import EditIcon from '../../assets/icons/edit.svg';


import * as ImagePicker from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import Api from '../../Api';
import storage from '@react-native-firebase/storage';

let timer;

export default () => {
    const [categoryText, setCategoryText] = useState('book');
    const [parts, setParts] = useState({label:'Parte 1', pages:[{page: 1, text: ``, image: ''}]});
    const [title, setTitle] = useState('');
    const [saved, setSaved] = useState('');

    const [optionsVisible, setOptionsVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [changeImage, setChangeImage] = useState(false);
    const [fileExists, setFileExists] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const [currentPage, setCurrentPage] = useState(0);
    const [action, setAction] = useState('');

    const [visibleInput, setVisibleInput] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [photoBookVisible, setPhotoBookVisible] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const userId = useSelector(state=>state.user.uid);
    const books = useSelector(state=>state.book);

    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const handleGetPhoto = (local) => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        };

        if(local==='camera'){
            ImagePicker.launchCamera(options,response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };
                    //console.log(source);
                    setImage(source);
                }
            });
        }else{
            ImagePicker.launchImageLibrary(options,response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };
                    //console.log(source);
                    setImage(source);
                    handleAddImage(source);
                    
                }
            });
        }
        if(fileExists){
            setChangeImage(true);
        }
        setOptionsVisible(false);
        
    }

    const uploadImage = async (source) => {
        const { uri } = source;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setLoading(true);
        setTransferred(0);
        const task = storage()
          .ref('images/texts/'+filename)
          .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
          );
        });
        try {
          await task;
        } catch (e) {
          console.error(e);
        }
        setLoading(false);
    }    

    const handleChangePoem = (t) => {
        let newList = {...parts};
        newList.pages[currentPage].text = t;
        setParts(newList); 
    }
    const handleAddImage = (source) => {
        let newParts = {...parts};
        newParts.pages[currentPage] = {...parts.pages[currentPage], image: source};
        uploadImage(source);
        setParts(newParts);
    }
    const handleAddPage = ()=>{
        if(parts.pages.length < currentPage + 2){
            let newList = {...parts};
            newList.pages.push({page:currentPage+2,text:``, image: ''});
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
            if(!parts.pages[currentPage].text){
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
        let id = route.params?.textId;
        const updated = await Api.updateBook(id, {...changes});
        if(updated){
            setSaved('- salvo');
        }else{
            setSaved('- erro ao salvar');
        }
        getMyBooks();
    }
    const getMyBooks = async () => {
        setLoading(true);
        let result = await Api.getMyTexts(userId);
        dispatch({
            type: 'SET_MYBOOKS',
            payload:{
                texts:result
            }
        });
        setLoading(false);
    }
    const getTextById = async (id) => {
        setLoading(true);
        const result = await Api.getTextById(id);
        setParts({
            label: result.partLabel,
            pages: result.pages ? result.pages : [{page: 1, text: ``}]
        });
        setTitle(result.title);
        setCategoryText(result.category);
        setLoading(false);
    }

    useEffect(()=>{
        setSaved('- salvando...');
        if(timer){
            clearTimeout(timer);
        }

        timer = setTimeout(onSaveBook, 2000);
    }, [parts.pages[currentPage].text,parts.pages[currentPage].image]);
    useEffect(() => {
        if(route.params?.textId){
            getTextById(route.params?.textId);
        }
    }, [route.params?.textId]);
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
            title:'Jovem, publique sua obra',
            headerTitleStyle:styles.heading3,
            headerRight: () => (
                <ButtonPrimary width="100%" height="60%" onPress={()=>setPhotoBookVisible(true)}>
                    <ButtonText>Publicar</ButtonText>
                </ButtonPrimary>
            )
        })
    }, []);

   

    return(
        <Container>
            <Categories modalVisible={categoryVisible} setModalVisible={value=>setCategoryVisible(value)} bookId={route.params?.textId} />
            <PhotoBook modalVisible={photoBookVisible} setModalVisible={value=>setPhotoBookVisible(value)} onSave={onSavePhoto} bookId={route.params?.textId} />
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
            <Modal visible={optionsVisible} transparent={true} animationType="slide" >
                <ImageArea onPress={()=>setOptionsVisible(false)}>
                    <OptionBook onPress={()=>{}} underlayColor="white">
                        <>
                            <OptionItem onPress={()=>handleGetPhoto('camera')}>
                                <CameraIcon width="24" height="24" fill="black" />
                                <OptionTextArea>
                                    <Small>Câmera</Small>
                                </OptionTextArea>
                            </OptionItem>
                            <OptionItem onPress={()=>handleGetPhoto('gallery')}>
                                <GalleryIcon width="24" height="24" fill="black" />
                                <OptionTextArea>
                                    <Small>Galeria</Small>
                                </OptionTextArea>
                            </OptionItem>
                        </>
                    </OptionBook>
                </ImageArea>
            </Modal>




            <PartTextArea>
                <Heading2 center color="white"><Bold>{currentPage % 2 === 0 ? parts.label : title}</Bold></Heading2>
                <Small color="white">{`${currentPage+1}/${parts.pages.length}`} {saved}</Small>
                <ButtonsOptions>
                    <ButtonOptionPart onPress={()=>handleShowPart('rename')}>
                        <EditIcon width="24" height="24" fill="white" />
                    </ButtonOptionPart>
                </ButtonsOptions>
            </PartTextArea>
            {
                parts.pages[currentPage].image ?
                <Photo source={{uri:parts.pages[currentPage].image?parts.pages[currentPage].image.uri:'https://www.w3schools.com/howto/img_avatar2.png'}} />
                :
                <InputText
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Começe a escrever"
                    textAlign={categoryText === 'book' ? 'left':"center"}
                    textAlignVertical="top"
                    value={parts.pages[currentPage].text}
                    onChangeText={t=>handleChangePoem(t)}
                    scrollEnabled={false}
                    maxLength={480}
                />
            }
            
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
                <ButtonAddPage onPress={()=>setOptionsVisible(true)}>
                    <GalleryIcon width="24" height="24" fill="white" />
                </ButtonAddPage>
                <ButtonAddPage onPress={handleAddPage}>
                    <AdsIcon width="24" height="24" fill="white" />
                </ButtonAddPage>
                <ButtonAddPage onPress={handleAddPage}>
                    <SharedIcon width="24" height="24" fill="white" />
                </ButtonAddPage>
            </OptionsPage>
        </Container>
    );
}