import React, { useState, useLayoutEffect, useEffect } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import useIcons from '../../utils/Icons';

import Api from '../../Api';

import { 
    Heading2,
    ButtonText,
    ButtonPrimary,
    colors,
    Small,
    styles,
    Heading1
} from '../../commonStyles';
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
    Photo,
    AdsArea
} from './styles';
import InputModal from '../../components/InputModal';
import Categories from '../../components/Categories';
import PhotoBook from '../../components/PhotoBook';
import { ActivityIndicator, Keyboard, Modal, Share } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';


let timer;
let initialState={
    parts: {label:'Parte 1', pages:[{page: 1, text: ``, image: '', ads: false}]},
    category: 'book',
    images: ['']
};

export default () => {
    const [categoryText, setCategoryText] = useState(initialState.category);
    const [parts, setParts] = useState(initialState.parts);
    const [title, setTitle] = useState('');
    const [saved, setSaved] = useState('');
    const [error, setError] = useState('');

    const [optionsVisible, setOptionsVisible] = useState(false);
    const [images, setImages] = useState(initialState.images);

    const [currentPage, setCurrentPage] = useState(0);
    const [action, setAction] = useState('');
    const [editing, setEditing] = useState(false);

    const [visibleInput, setVisibleInput] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [photoBookVisible, setPhotoBookVisible] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDeleteImg, setShowDeleteImg] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showAds, setShowAds] = useState(false);
    const [showDeleteAds, setShowDeleteAds] = useState(false);

    const userId = useSelector(state=>state.user.uid);

    const navigation = useNavigation();
    const route = useRoute();
    const icons = useIcons();
    const dispatch = useDispatch();

    const onShare = async () => {
        try {
            const result = await Share.share({
            message: 
            `
                ${title}

                ${parts.pages.map((item)=>(
                `
                ${item.page}/${parts.pages.length}

                ${item.text}
                `
            ))}
                Autor: TODO
                Instagram: Não disponível
            `.trim(),
            });
            if (result.action === Share.sharedAction) {
            if (result.activityType) {
            } else {

            }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            setError(error.message);
            setShowError(true);
        }
    }
    const onGetPicture = (local) => {
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
                    //console.log('User cancelled image picker');
                } else if (response.error) {
                    setError(response.error);
                    setShowError(true);
                } else if (response.customButton) {
                    //console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };
                    addImage(source);
                }
            });
        }else{
            ImagePicker.launchImageLibrary(options,response => {
                if (response.didCancel) {
                    //console.log('User cancelled image picker');
                } else if (response.error) {
                    setError(response.error);
                    setShowError(true);
                } else if (response.customButton) {
                    //console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };
                    addImage(source);
                }
            });
        }
        setOptionsVisible(false);
    }


    const updateText  = async (changes)=>{
        let id = route.params?.textId;
        const updated = await Api.updateBook(id, {...changes});
        if(updated){
            setSaved('- salvo');
            setParts({...parts, ...changes});
        }else{
            setSaved('- erro ao salvar');
        }
        getMyBooks();
        setEditing(false);
    }
    const addImage = async (source)=>{
        setLoading(true);
        const result = await Api.addImageInStorage(source,'/images/texts/');
        if(result.error){
            setError(result.error);
            setShowError(true);
        }else{
            let filename = result.data;
            let newPages = parts.pages;
            newPages[currentPage] = {...newPages[currentPage], image:filename};
            updateText({pages:newPages});
            getImage(result.data);
        }
        setLoading(false);
    }
    const getImage = async (ref) => {
        setLoading(true);
        let newImages = [...images];
        if(ref){
            if(!newImages[currentPage]){
                const result = await Api.getImageInStorage(ref, '/images/texts/');
                if(result.error){
                    setError(result.error);
                    setShowError(true);   
                }else{
                    newImages[currentPage] = result.data;
                }   
            }
        }else{
            newImages[currentPage] = "";
        }
        
        setImages(newImages);
        setLoading(false);
    }
    const onDeleteImage = async () => {
        setShowDeleteImg(false);
        setLoading(true);
        let ref = parts.pages[currentPage].image;

        if(ref){
            const result = await Api.delImageInStorage(ref, '/images/texts/');
            if(result.error){
                setError(result.error);
                setShowError(true);
            }else{
                if(result.data){
                    let newImages = images;
                    newImages[currentPage] = '';
                    let newPages = [...parts.pages];
                    newPages[currentPage] = {...newPages[currentPage], image:''};
                    updateText({pages:newPages});
                    setImages(newImages);
                }
            }   
        }
        setLoading(false);
    }

    const handleClickAds = () => {
        if(parts.pages[currentPage].ads){
            setShowDeleteAds(true);
        }else{
            setShowAds(true);
        }
    }

    const handleClickPhoto = () => {
        if(images[currentPage]){
            setShowDeleteImg(true);
        }else{
            setOptionsVisible(true);
        }
       
    }
    const handleChangeText = (t) => {
        let newList = {...parts};
        newList.pages[currentPage].text = t;
        setParts(newList); 
        setEditing(true);
    }
    const handleClickAddPage = ()=>{
        if(parts.pages.length < currentPage + 2){
            let newList = {...parts};
            newList.pages.push({page:currentPage+2,text:``, image: '', ads:false});
            setParts(newList); 
            getImage('');
        }
        nextPage();
    }
    const deletePage = () => {
        let newList = {...parts};
        newList.pages = newList.pages.filter((i,k)=>k!==currentPage);
        setParts(newList);
        updateText({pages:newList.pages});
    }
    const nextPage = () => {
        setCurrentPage(prevState=>prevState+1);
        //console.log(parts.pages);
    }
    const handleClickPrevPage = () => {
        if(currentPage > 0){
            if(!parts.pages[currentPage].text && !parts.pages[currentPage].image && !parts.pages[currentPage].ads && currentPage+1===parts.pages.length){
                deletePage();
            }
            setCurrentPage(prevState=>prevState-1);
        }
    }
    const handleClickEditTitle = (act) => {
        setVisibleInput(true);
        setAction(act);
    }
    const handleEditTitleOrPart = async (newTitle) => {
        setLoading(true);
        if(currentPage%2===0){
            updateText({partLabel: newTitle});
            let newParts = {...parts};
            newParts.label = newTitle;
            setParts(newParts);
        }else{
            updateText({title: newTitle});
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
        updateText({pages: parts.pages});
    }
    const onMonetizeText = async () => {
        setLoading(true);
        let newPages = parts.pages;
        newPages[currentPage].ads = !newPages[currentPage].ads;
        await updateText({pages: newPages});
        setLoading(false);
        setShowAds(false);
        setShowDeleteAds(false);
    }

    const getMyBooks = async () => {
        //setLoading(true);
        let result = await Api.getMyTexts(userId);
        dispatch({
            type: 'SET_MYBOOKS',
            payload:{
                texts:result
            }
        });
        //setLoading(false);
    }
    const getTextById = async (id) => {
        setLoading(true);
        const result = await Api.getTextById(id);
        setParts({
            label: result.partLabel,
            pages: result.pages ? result.pages : [{page: 1, text: ``, image:'', ads:true}]
        });
        getImage(result.pages[currentPage].image);
        setTitle(result.title);
        setCategoryText(result.category);
        setLoading(false);
    }
    

    useEffect(()=>{
        getImage(parts.pages[currentPage].image);
    }, [currentPage]);
    useEffect(()=>{
        const saveText = () => {
            updateText({pages: parts.pages});
        }
        if(editing){
            setSaved('- salvando...');
            if(timer){
                clearTimeout(timer);
            }
            
            timer = setTimeout(saveText, 2000);
        }
       
        
    }, [parts.pages[currentPage].text]);
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
                            <OptionItem onPress={()=>onGetPicture('camera')}>
                                {icons.getIcons('camera', 24,24,'black')}
                                <OptionTextArea>
                                    <Small>Câmera</Small>
                                </OptionTextArea>
                            </OptionItem>
                            <OptionItem onPress={()=>onGetPicture('gallery')}>
                                {icons.getIcons('gallery', 24,24,'black')}
                                <OptionTextArea>
                                    <Small>Galeria</Small>
                                </OptionTextArea>
                            </OptionItem>
                        </>
                    </OptionBook>
                </ImageArea>
            </Modal>
            <AwesomeAlert
                show={showDeleteImg}
                showProgress={true}
                title="Excluir a foto"
                message="Deseja realmente excluir essa foto?"
                titleStyle={styles.heading3}
                messageStyle={styles.small}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={true}
                showConfirmButton={true}
                onDismiss={() => {
                    setShowDeleteImg(false);
                }}
                cancelText="Cancelar"
                confirmText="EXCLUIR"
                confirmButtonColor={colors.danger}
                cancelButtonTextStyle={styles.small_light}
                confirmButtonTextStyle={styles.small_light}
                onCancelPressed={() => {
                    setShowDeleteImg(false);
                }}
                onConfirmPressed={onDeleteImage}
            />
            <AwesomeAlert
                show={showError}
                showProgress={true}
                title="OPS! Jovem algo deu errado"
                titleStyle={styles.heading3}
                message={`ERRO: ${error}`}
                messageStyle={styles.small}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={false}
                showConfirmButton={true}
                onDismiss={()=>setShowError(false)}
                cancelText="Cancelar"
                confirmText="ENTENDIDO"
                confirmButtonColor={colors.danger}
                confirmButtonTextStyle={styles.small_light}
                onCancelPressed={() => {}}
                onConfirmPressed={()=>setShowError(false)}
            />
            <AwesomeAlert
                show={showAds}
                showProgress={true}
                title="Jovem, deseja colocar anúncio nessa página?"
                message="40% do valor recebido com o anúncio será repassado para você"
                titleStyle={[styles.heading3,{color: colors.primary}]}
                messageStyle={[styles.small,{color: colors.gray_2}]}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={true}
                showConfirmButton={true}
                onDismiss={() => {
                    setShowAds(false);
                }}
                cancelText="Cancelar"
                confirmText="VAMOS LUCRAR!"
                confirmButtonColor={colors.success}
                onCancelPressed={() => {
                    setShowAds(false);
                }}
                onConfirmPressed={onMonetizeText}
                cancelButtonTextStyle={styles.small_light}
                confirmButtonTextStyle={styles.small_light}
            />
            <AwesomeAlert
                show={showDeleteAds}
                showProgress={true}
                title="Tirar monetização"
                message="Jovem, deseja parar de receber dinheiro com essa página?"
                titleStyle={styles.heading3}
                messageStyle={styles.small}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={true}
                showConfirmButton={true}
                onDismiss={() => {
                    setShowDeleteAds(false);
                }}
                cancelText="Cancelar"
                confirmText="TIRAR ANÚNCIO"
                confirmButtonColor={colors.danger}
                cancelButtonTextStyle={styles.small_light}
                confirmButtonTextStyle={styles.small_light}
                onCancelPressed={() => {
                    setShowDeleteAds(false);
                }}
                onConfirmPressed={onMonetizeText}
            />


            <PartTextArea>
                <Heading2 center color="white"><Bold>{currentPage % 2 === 0 ? parts.label : title}</Bold></Heading2>
                <Small color="white">{`${currentPage+1}/${parts.pages.length}`} {saved}</Small>
                <ButtonsOptions>
                    <ButtonOptionPart onPress={()=>handleClickEditTitle('rename')}>
                        {icons.getIcons('edit', 24,24,'white')}
                    </ButtonOptionPart>
                </ButtonsOptions>
            </PartTextArea>
            {
                parts.pages[currentPage].ads ?
                <AdsArea>
                    <Heading2 color="white">Após publicada aqui será um anúncio</Heading2>
                </AdsArea>
                :
                images[currentPage]?
                <Photo source={{uri:images[currentPage]}} />
                :
                <InputText
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Começe a escrever"
                    textAlign={categoryText === 'book' ? 'left':"center"}
                    textAlignVertical="top"
                    value={parts.pages[currentPage].text}
                    onChangeText={t=>handleChangeText(t)}
                    scrollEnabled={false}
                    maxLength={480}
                />
            }
            
            <OptionsPage position="left">
                <ButtonAddPage onPress={handleClickPrevPage}>
                    {icons.getIcons('left', 24,24,'white')}
                </ButtonAddPage>
            </OptionsPage>
            <OptionsPage position="right">
                <ButtonAddPage onPress={handleClickAddPage}>
                    {icons.getIcons('right', 24,24,'white')}
                    {
                        parts.pages.length < currentPage + 2
                        &&
                        <ButtonAddPageItem>
                            <ButtonAddPageItemText>+</ButtonAddPageItemText>
                        </ButtonAddPageItem>
                    }
                </ButtonAddPage>
                <ButtonAddPage onPress={handleClickPhoto}>
                    {icons.getIcons('gallery', 24,24,'white')}
                    {
                        !!images[currentPage]
                        &&
                        <ButtonAddPageItem>
                            <ButtonAddPageItemText>-</ButtonAddPageItemText>
                        </ButtonAddPageItem>
                    }
                </ButtonAddPage>
                <ButtonAddPage onPress={handleClickAds}>
                    {icons.getIcons('ads', 24,24,'white')}
                </ButtonAddPage>
                <ButtonAddPage onPress={onShare}>
                    {icons.getIcons('share', 24,24,'white')}
                </ButtonAddPage>
            </OptionsPage>
        </Container>
    );
}