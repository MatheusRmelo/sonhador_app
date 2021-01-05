import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { 
    Modal,
    Keyboard,
    ActivityIndicator,
    Alert
} from 'react-native';
import styled from 'styled-components/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Heading2, Small, colors, styles } from '../commonStyles';

import { useCategory } from '../CategorySVG';

import { PoemApi } from '../PoemApi';
import Api from '../Api';


import LeftArrowIcon from '../assets/icons/arrow.svg';
import MenuIcon from '../assets/icons/menu.svg';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';



const Container = styled.View`
    flex:1;
    background-color: white;
`;
const Header = styled.View`
    flex-direction:row;
    border-bottom-width:1px;
    border-bottom-color: #CCC;
    padding: 8px 16px;
    align-items:center;
    margin-bottom:16px;
    height:64px;
`;
const Input = styled.TextInput`
    font-size:16px;
    margin-right:24px;
    padding: 8px 16px;
    font-family: 'Fredoka One';
    width:80%;
`;
const BackButton = styled.TouchableOpacity`
`;
const ModalItem = styled.TouchableOpacity`
    width:100%;
    padding:8px;
    flex-direction:row;
    align-items:center;
`;
const Information = styled.View`
    margin:0px 16px;
    flex:1;
`;
const Title = styled.Text`
`;
const ButtonOption = styled.TouchableOpacity``;

const LoadingArea = styled.View`
    flex:1;
    background-color: rgba(0,0,0,0.5);
    justify-content:center;
    align-items:center;
`;


let timer;

export default () => {
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [poem, setPoem] = useState(PoemApi);
    const [search, setSearch] = useState('');
    const [listBooks, setListBooks] = useState([]);
    const [currentBook, setCurrentBook] = useState([]);


    const userId = useSelector(state=>state.user.uid);
    const books = useSelector(state=>state.book.myBooks);

    const dispatch = useDispatch();
    const category = useCategory();
    const navigation = useNavigation();
    const keyboardShowListener = useRef(null);
    const keyboardHideListener = useRef(null);

    const getMyBooks = async () => {
        setLoading(true);
        let result = await Api.getMyTexts(userId);
        dispatch({
            type: 'SET_MYBOOKS',
            payload:{
                books:result
            }
        });
        setCurrentBook(result[0]);
        setListBooks(result);
        setLoading(false);
    }
    const onSearch = async () => {
        let newBooks = [];
        if(search === ''){
            getMyBooks();
        }else{
            listBooks.forEach((item)=>{
                let title = item.text.title.toLowerCase();
                if(title.indexOf(search.toLowerCase())!= -1){
                    newBooks.push(item);
                }
                console.log(title.indexOf(search));
               
            });
            
            setListBooks(newBooks);
        }
    }   


    const handleClickNewText = async (item) => {
        let {id, text} = item;
        if(text.published){
            setShowAlert(true);
            setCurrentBook(item);
        }else{
            navigation.reset({
                routes: [{name: 'Writer'},{name: 'WriterPoem', params: { bookId: id }}]
            });
        }
    }
    const handleClickNewVersion = async () => {
        let {id, book} = currentBook;
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
        const books = await Api.getMyTexts(userId);
        setLoading(false);
        dispatch({type:'SET_MYBOOKS', payload:{books}});
        navigation.reset({
            routes: [{name: 'Writer'},{name: 'WriterPoem', params: { bookId: saveBook.bookId }}]
        });
    }


    useEffect(()=>{
        getMyBooks();
    }, []);

    useEffect(() => {
        keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => dispatch({type:'SET_VISIBLE', payload:{visible:false}}));
        keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => dispatch({type:'SET_VISIBLE', payload:{visible:true}}));

        return () => {
            keyboardShowListener.current.remove();
            keyboardHideListener.current.remove();
        }
    });
    useEffect(()=>{
        if(timer){
            clearTimeout(timer);
        }

        timer = setTimeout(onSearch, 500);
    }, [search]);

    return(
        <Container>
            <Modal visible={loading} transparent={true}>
                <LoadingArea>
                    <ActivityIndicator size="large" color={colors.primary} />
                </LoadingArea>
            </Modal>
            <AwesomeAlert
                show={showAlert}
                showProgress={true}                
                message="Jovem, essa história já foi publicada. O que você deseja fazer agora?"
                messageStyle={styles.heading2}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                onDismiss={() =>setShowAlert(false)}
                showCancelButton={true}
                cancelButtonColor={colors.secondary}
                showConfirmButton={true}
                cancelButtonTextStyle={styles.small_light}
                cancelText="Apenas visualizar"
                confirmText="Nova versão"
                confirmButtonTextStyle={styles.small_light}
                confirmButtonColor={colors.primary}
                onCancelPressed={() =>setShowAlert(false)}
                onConfirmPressed={()=>handleClickNewVersion(false)}
            />
            <Header>
                <BackButton onPress={()=>navigation.goBack()}>
                    <LeftArrowIcon width="24" height="24" fill={colors.gray_2} />
                </BackButton>
                <Input value={search} placeholder="Pesquise sua obra..." onChangeText={e=>setSearch(e)} autoFocus={true} />
            </Header>
            {
                listBooks.map((item, key)=>(
                    <ModalItem key={key} onPress={()=>handleClickNewText(item)}>
                        {category.getCategory(item.text.category,'24', '24', 'black')}
                        <Information>
                            <Heading2 color="black" >{item.text.title}</Heading2>
                            <Small color={colors.gray_2}>Publicado: {item.text.published ? 'SIM': 'NÃO'}</Small>
                        </Information>
                        {/* <ButtonOption onPress={()=>setShowOption(key)}>
                            <MenuIcon width="24" height="24" fill="black"  />
                        </ButtonOption> */}
                    </ModalItem>
                ))
            }
        </Container>
        
    );
}