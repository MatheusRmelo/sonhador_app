import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { colors, Small, styles } from '../commonStyles';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Modal, ActivityIndicator } from 'react-native';

import { useCategory } from '../CategorySVG';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import MenuIcon from '../assets/icons/menu.svg';


import Api from '../Api';


const PoemArea = styled.TouchableOpacity`
    border-radius:8px;
    width:45%;
    align-items: center;
    justify-content:center;
    margin:8px;
    margin-bottom:24px;
`;
const PoemView = styled.View`
    background-color: ${colors.primary_1};    
    width:100%;
    padding:8px;
    border-radius:16px;
    justify-content:center;
    align-items:center;
    margin:8px 0px;
`;
const Poem = styled.View`
    background-color:white;
    width:50%;
    padding:16px;
    align-items:center;
    justify-content:center;
    border-radius:16px;
`;
const PoemBody = styled.Text`
    font-size:3px;
    color:black;
    height:48px;
`;
const PoemDesc = styled.View`
    flex-direction:row;
    width:100%;
    justify-content:space-around;
    align-items:center;
`;

const LoadingArea = styled.View`
    flex:1;
    background-color: rgba(0,0,0,0.5);
    justify-content:center;
    align-items:center;
`;


const Options = styled.TouchableOpacity`

`;
export default ({poem, setActionVisible, bookId}) => {
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const userId = useSelector(state=>state.user.uid);
    const category = useCategory();
    const navigation = useNavigation();

    const handleOpenBook = () => {
        let book = poem;
        let id = bookId; 
        if(book.published){
            setShowAlert(true);
        }else{
            navigation.reset({
                routes: [{name: 'Writer'},{name: 'WriterPoem', params: { bookId: id }}]
            });
        }
    }
    const handleNewVersion = async () => {
        let book = poem;
        let id = bookId;
        setLoading(true);
        let numberPart = book.partNumber+1; 
        let newBook = {
            title: book.title ? book.title + ' ' + numberPart  : 'Sem título ' + numberPart,
            partNumber: numberPart,
            partLabel:'Parte ' + numberPart,
            category: book.category,
            published:false,
            userId
        };
        const saveBook = await Api.saveBook({...newBook});
        const books = await Api.getMyBooks(userId);
        setLoading(false);
        dispatch({type:'SET_MYBOOKS', payload:{books}});
        navigation.reset({
            routes: [{name: 'Writer'},{name: 'WriterPoem', params: { bookId: saveBook.bookId }}]
        });
    }
    const handleSeeBook = () => {
        setShowAlert(false);
    }

    return(
        <PoemArea onPress={handleOpenBook}>
            <Modal visible={loading} transparent={true}>
                <LoadingArea>
                    <ActivityIndicator size="large" color={colors.primary} />
                </LoadingArea>
            </Modal>
            <AwesomeAlert
                show={showAlert}
                showProgress={true}                
                message="Jovem essa história já foi publicada, o que você deseja fazer agora?"
                messageStyle={styles.heading2}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                onDismiss={() =>setShowAlert(false)}
                showCancelButton={true}
                cancelButtonColor={colors.secondary}
                showConfirmButton={true}
                cancelButtonTextStyle={styles.small_light}
                cancelText="Apenas visualizar"
                confirmText="Nova versão"
                confirmButtonTextStyle={styles.small_light}
                confirmButtonColor={colors.primary}
                onCancelPressed={() =>handleSeeBook(false)}
                onConfirmPressed={()=>handleNewVersion(false)}
            />
            <PoemView>
                <Poem>
                    <PoemBody>{poem.body}</PoemBody>
                </Poem>
            </PoemView>
            <PoemDesc>
                {category.getCategory(poem.category, '16', '16', 'black')}
                <Small>{poem.title}</Small>
                <Options onPress={()=>setActionVisible()}>
                    <MenuIcon width="16" height="16" fill="black" />
                </Options>
            </PoemDesc>
        </PoemArea>
    )
}