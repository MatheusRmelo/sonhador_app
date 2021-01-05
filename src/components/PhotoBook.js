import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import useIcons from '../utils/Icons';

import CheckBox from '@react-native-community/checkbox';
import { ActivityIndicator, Modal, Alert } from 'react-native';
import styled from 'styled-components/native';
import { colors, Small, Heading2, ButtonPrimary, ButtonText } from '../commonStyles';
import * as Progress from 'react-native-progress';

import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import Api from '../Api';


const Container = styled.View`
    background-color:white;
    flex:1;
    align-items:center;
    padding:32px;
`;
const CloseButton = styled.TouchableOpacity`
    position:absolute;
    top:16px;
    right:16px;
    align-items:center;
    justify-content:center;
`;
const ButtonArea = styled.View`
    background-color: white;
    align-items:center;
    justify-content:center;
    height:15%;
    width:100%;
`;
const LoadingArea = styled.View`
    background-color: rgba(0,0,0,0.5);
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
`;
const PhotoArea = styled.View`
    flex:1;
    width:100%;
    justify-content:center;
    align-items:center;
`;
const Photo = styled.Image`
    flex:1;
    width:100%;
    margin:16px 0px;
    border-radius:32px;
    background-color:#CCC;
`;
const ButtonAddPhoto = styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    background-color:${colors.secondary};
    border-radius:32px;
    width:64px;
    height:64px;
`;

const OptionBook = styled.TouchableHighlight`
    position:absolute;
    bottom:20%;
    right:80px;
    background-color:white;
    width:50%;
    height:20%;
    border-radius:16px;
    padding:8px;
`;
const OptionItem  = styled.TouchableOpacity`
    flex-direction:row;
    padding:0px 8px;
    margin:16px 0px;
`;
const OptionTextArea = styled.View`
    flex:1;
    border-bottom-width:1px;
    border-bottom-color: #CCC;
    padding:0 8px;
    margin:0 8px;
`;
export const ModalArea = styled.TouchableOpacity`
    flex:1;
    background-color: rgba(0,0,0,0.5);
    justify-content:flex-end;
`;
export const CheckBoxArea = styled.View`
    flex-direction:row;
    justify-content:center;
    align-items:center;
`;
export default ({modalVisible, setModalVisible, onSave, bookId}) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [changeImage, setChangeImage] = useState(false);

    const [file, setFile] = useState('');
    const [fileExists, setFileExists] = useState(false);

    const icons = useIcons();

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
                }
            });
        }
        if(fileExists){
            setChangeImage(true);
        }
        setOptionsVisible(false);
    }
    

    const uploadImage = async () => {
        setLoading(true);
        if(toggleCheckBox){
            const save = await Api.updateBook(bookId, {cover: ''});
        }else{
            console.log(image);
            const result = await Api.addImageInStorage(image,'/images/texts/cover/');
            if(result.error){
                Alert.alert('error',result.error);
                return;
            }
            const save = await Api.updateBook(bookId, {cover: result.data});
        }
       
        setLoading(false);
        setImage(null);
        onSave(true);
    }      
    const updateImage = async () => {
        if(changeImage){
            const result = await Api.delImageInStorage(file,'/images/texts/cover/');
            if(result.error){
                Alert.alert('error',result.error);
                return;
            }
            uploadImage();
        }
        onSave(true);
    }      
    

    function handleChangeCheckBox(value){
        setToggleCheckBox(value);
        if(value){
            setEnabled(true);
        }else{
            setEnabled(false);
        }
        
    }


    useEffect(()=>{
        if(image){
            setEnabled(true);
        }else{
            setEnabled(false);
        }
        
    }, [image]);

    useEffect(()=>{
        const getBookById = async (id) => {
            setLoading(true);
            const text = await Api.getTextById(id);
            if(text.cover){
                const result = await Api.getImageInStorage(text.cover, '/images/texts/cover/');
                if(result.error){

                }else{
                    setImage({uri:result.data});
                    setFile(result.data);
                    setFileExists(true);
                }
               
            }
            setLoading(false);
        }
        getBookById(bookId);
    }, [modalVisible]);
    
    return(
        <Modal visible={modalVisible}>
            <Modal transparent={true} visible={loading} >
                <LoadingArea>
                    <ActivityIndicator size="large" color={colors.primary} />
                    {/* <Progress.Bar progress={transferred} width={300} /> */}
                </LoadingArea>
            </Modal>
            <Modal visible={optionsVisible} transparent={true} animationType="slide" >
                <ModalArea onPress={()=>setOptionsVisible(false)}>
                    <OptionBook onPress={()=>{}} underlayColor="white">
                        <>
                            <OptionItem onPress={()=>onGetPicture('camera')}>
                                {icons.getIcons('camera', 24,24, 'black')}
                                <OptionTextArea>
                                    <Small>Câmera</Small>
                                </OptionTextArea>
                            </OptionItem>
                            <OptionItem onPress={()=>onGetPicture('gallery')}>
                                {icons.getIcons('gallery', 24,24, 'black')}
                                <OptionTextArea>
                                    <Small>Galeria</Small>
                                </OptionTextArea>
                            </OptionItem>
                        </>
                    </OptionBook>
                </ModalArea>
            </Modal>

           
            <Container>
                <CloseButton onPress={()=>setModalVisible(false)}>
                    {icons.getIcons('close', 24,24,'black')}
                </CloseButton>
                <Heading2 margin="64px 16px 0px 0px">Não esqueça da foto de capa da sua obra</Heading2>
                <PhotoArea>
                    <Photo source={{uri:image?image.uri:null}} />
                    <ButtonAddPhoto onPress={()=>setOptionsVisible(true)}>
                        {icons.getIcons('add', 24,24,'white')}
                    </ButtonAddPhoto>
                </PhotoArea>
                {
                    !fileExists &&
                    <CheckBoxArea>
                        <CheckBox
                            boxType="circle"
                            onTintColor="#000000"
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={handleChangeCheckBox}
                        />
                        <Heading2 color='black'>Continuar sem capa</Heading2>
                    </CheckBoxArea>
                }
                
                <ButtonArea>
                    <ButtonPrimary onPress={fileExists ? updateImage :uploadImage} disabled={!enabled} style={{backgroundColor: enabled ? colors.secondary : colors.light_1}} width="80%" height="40%" rounded="60px">
                        <ButtonText>{fileExists ? 'ATUALIZAR E CONTINUAR':'SALVAR E CONTINUAR'}</ButtonText>
                    </ButtonPrimary>
                </ButtonArea>
            </Container>
           
        </Modal>
    )
}
