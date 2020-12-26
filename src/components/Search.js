import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { 
    Modal,
    Keyboard,
    BackHandler,
    Alert 
} from 'react-native';
import styled from 'styled-components/native';
import { useCategory } from '../CategorySVG';

import { Heading2, Small, colors } from '../commonStyles';

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


let timer;

export default () => {
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [poem, setPoem] = useState(PoemApi);
    const [search, setSearch] = useState('');
    const [listBooks, setListBooks] = useState([]);


    const userId = useSelector(state=>state.user.uid);
    const books = useSelector(state=>state.book.myBooks);

    const dispatch = useDispatch();
    const category = useCategory();
    const navigation = useNavigation();
    const keyboardShowListener = useRef(null);
    const keyboardHideListener = useRef(null);

    const getMyBooks = async () => {
        setLoading(true);
        let result = await Api.getMyBooks(userId);
        dispatch({
            type: 'SET_MYBOOKS',
            payload:{
                books:result
            }
        });
        setLoading(false);
    }

    const handleSearch = async () => {
        let newBooks = [];
        if(search === ''){
            getMyBooks();
        }else{
            books.forEach((item)=>{
                let title = item.book.title.toLowerCase();
                if(title.indexOf(search.toLowerCase())!= -1){
                    newBooks.push(item);
                }
                console.log(title.indexOf(search));
               
            });
            
            setListBooks(newBooks);
        }
    }   


    useEffect(()=>{
        setListBooks(books);
    }, [books]);

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

        timer = setTimeout(handleSearch, 500);
    }, [search]);

    const handleNewText = async (item) => {
        let {id, book} = item;
        if(book.published){
            //TODO - COLOCAR PERGUNTA SE DESEJA CONTINUAR A HISTÓRIA
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
        }else{
            navigation.reset({
                routes: [{name: 'Writer'},{name: 'WriterPoem', params: { bookId: id }}]
            });
        }
    }

    return(
        <Container>
            <Header>
                <BackButton onPress={()=>navigation.goBack()}>
                    <LeftArrowIcon width="24" height="24" fill={colors.gray_2} />
                </BackButton>
                <Input value={search} placeholder="Pesquise sua obra..." onChangeText={e=>setSearch(e)} autoFocus={true} />
            </Header>
            {
                listBooks.map((item, key)=>(
                    <ModalItem key={key} onPress={()=>handleNewText(item)}>
                        {category.getCategory(item.book.category,'24', '24', 'black')}
                        <Information>
                            <Heading2 color="black" >{item.book.title}</Heading2>
                            <Small color={colors.gray_2}>Publicado: {item.book.published ? 'SIM': 'NÃO'}</Small>
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