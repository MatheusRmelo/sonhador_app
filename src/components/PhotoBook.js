import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { ActivityIndicator, Modal, Alert } from 'react-native';
import styled from 'styled-components/native';
import { colors, Small, Heading2, ButtonPrimary, ButtonText } from '../commonStyles';
import * as Progress from 'react-native-progress';

import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import Api from '../api';

import CloseIcon from '../assets/icons/close.svg';
import AddIcon from '../assets/icons/plus.svg';
import CameraIcon from '../assets/icons/camera.svg';
import GalleryIcon from '../assets/icons/gallery.svg';


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
export default ({modalVisible, setModalVisible, onSave}) => {
    const [enabled, setEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const navigation = useNavigation();
    const userId = useSelector(state=>state.user.uid);
    const dispatch = useDispatch();


    useEffect(()=>{
        if(image){
            setEnabled(true);
        }else{
            setEnabled(false);
        }
        
    }, [image]);

    const uploadImage = async () => {
        const { uri } = image;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setLoading(true);
        setTransferred(0);
        const task = storage()
          .ref(filename)
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
        setImage(null);
        dispatch({
            type: 'SET_PHOTO',
            payload:{
                photo: uri
            }
        });
        onSave(true);
    }      
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
                }
            });
        }

        setOptionsVisible(false);
        
    }
    

    return(
        <Modal visible={modalVisible}>
            <Modal transparent={true} visible={loading} >
                <LoadingArea>
                    <ActivityIndicator size="large" color="#00ff00" />
                    {/* <Progress.Bar progress={transferred} width={300} /> */}
                </LoadingArea>
            </Modal>
           
            <Container>
                <CloseButton onPress={()=>setModalVisible(false)}>
                    <CloseIcon width="24" height="24" fill="black" />
                </CloseButton>
                <Heading2 margin="64px 16px 0px 0px">Não esqueça da foto de capa da sua obra</Heading2>
                <PhotoArea>
                    <Photo source={{uri:image?image.uri:'https://www.w3schools.com/howto/img_avatar2.png'}} />
                    <ButtonAddPhoto onPress={()=>setOptionsVisible(true)}>
                        <AddIcon width="24" height="24" fill="white" />
                    </ButtonAddPhoto>
                </PhotoArea>
                
                <ButtonArea>
                    <ButtonPrimary onPress={uploadImage} disabled={!enabled} style={{backgroundColor: enabled ? colors.secondary : colors.light_1}} width="80%" height="40%" rounded="60px">
                        <ButtonText>SALVAR E CONTINUAR</ButtonText>
                    </ButtonPrimary>
                </ButtonArea>
            </Container>
            <Modal visible={optionsVisible} transparent={true} animationType="slide" >
                <ModalArea onPress={()=>setOptionsVisible(false)}>
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
                </ModalArea>
            </Modal>
        </Modal>
    )
}
