import React, { useState, useEffect } from 'react';
import {
    Container,
    Header,
    FilterButton,
    Logo,
    DirectButton,
    TabChoose,
    ChooseItem,
    ChooseItemText,
    Poem,
    PoemTitle,
    PoemPages,
    PoemBody,
    OptionsPage,
    OptionItemFollow,
    OptionItem,
    OptionNumberItem,
    OptionFollowItem,
    OptionFollowItemText,
    NextPage,
    ModalArea,
    ModalContainer,
    ListComments,
    CommentItem,
    CommentAuthor,
    CommentAreaText,
    Comment,
    CommentDelete,
    ListFilter,
    ListFilterText,
    ListFilterScroll,
    ChooseItemFilter,
    ChooseItemFilterText,
    CloseModalButton,
    Credits,
    CreditSocial,
    CreditSocialText,
    ButtonFollow,
    ButtonFollowText,
    InputArea,
    InputComment,
    SwiperArea,
    PartBook,
    BookArea,
    Book,
    BookText
} from './styles';
import { Modal, Keyboard, Share } from 'react-native';

import Swiper from 'react-native-swiper';

import { colors, Heading2, Small } from '../../commonStyles';
import { categoriesList, typesList } from '../../categories';

import FilterIcon from '../../assets/icons/filter.svg';
import DirectIcon from '../../assets/icons/direct.svg';
import RightArrowIcon from '../../assets/icons/right-arrow.svg';
import ProfileIcon from '../../assets/icons/profile.svg';
import HeartIcon from '../../assets/icons/heart.svg';
import LikeIcon from '../../assets/icons/like.svg';
import MessengerIcon from '../../assets/icons/messenger.svg';
import ShareIcon from '../../assets/icons/share.svg';
import UpArrowIcon from '../../assets/icons/up-arrow.svg';
import DownArrowIcon from '../../assets/icons/down-arrow.svg';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import TwitterIcon from '../../assets/icons/twitter.svg';
import TrashIcon from '../../assets/icons/trash.svg';

import { PoemApi, authorsApi } from '../../PoemApi';

export default () => {
    const [choose, setChoose] = useState('follow');

    const [poemList, setPoemList] = useState(PoemApi);
    const [authorsList, setAuthorsList] = useState(authorsApi);
    const [currentPoem, setCurrentPoem] = useState(0);

    const [books, setBooks] = useState([
        {
            title:'Título',
            parts:{
                label:'Parte 1',
                pages:[
                    {
                        page:1, 
                        book: `
        Como posso não sonhar?
        Se tudo isso é o que restou
        Se isso é tudo oque sou
        Um simples jovem sonhador

        Como posso não sonhar?
        Se tudo isso é o que restou
        Se isso é tudo oque sou
        Um simples jovem sonhador

        Como posso não sonhar?
        Se tudo isso é o que restou
        Se isso é tudo oque sou
        Um simples jovem sonhador
                        `
                    },
                    {
                        page:2,
                        book: `
        TESTE                
                        `
                    }
                ]
            },
            numbers:{
                views:120,
                likes:123,
                comments:[{author:'du', comment:'MASSA!'}],
                shared: 40
            }
        },
        {
            title:'Título',
            parts:{
                label:'Parte 1',
                pages:[
                    {
                        page:1, 
                        book: `
        Como posso não sonhar?
        Se tudo isso é o que restou
        Se isso é tudo oque sou
        Um simples jovem sonhador

        Como posso não sonhar?
        Se tudo isso é o que restou
        Se isso é tudo oque sou
        Um simples jovem sonhador

        Como posso não sonhar?
        Se tudo isso é o que restou
        Se isso é tudo oque sou
        Um simples jovem sonhador
                        `
                    },
                    {
                        page:2,
                        book: `
        TESTE                
                        `
                    }
                ]
            },
            numbers:{
                views:120,
                likes:123,
                comments:[{author:'du', comment:'MASSA!'}],
                shared: 40
            }
        },
        {
            title:'Título',
            parts:{
                label:'Parte 1',
                pages:[
                    {
                        page:1, 
                        book: `
        Como posso não sonhar?
        Se tudo isso é o que restou
        Se isso é tudo oque sou
        Um simples jovem sonhador

        Como posso não sonhar?
        Se tudo isso é o que restou
        Se isso é tudo oque sou
        Um simples jovem sonhador

        Como posso não sonhar?
        Se tudo isso é o que restou
        Se isso é tudo oque sou
        Um simples jovem sonhador
                        `
                    },
                    {
                        page:2,
                        book: `
        TESTE                
                        `
                    }
                ]
            },
            numbers:{
                views:120,
                likes:123,
                comments:[{author:'du', comment:'MASSA!'}],
                shared: 40
            }
        },
        
    ]);
    const [currentPage, setCurrentPage] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showCredits, setShowCredits] = useState(false);

    const [liked, setLiked]= useState(false);
    const [followed, setFollowed] = useState(false); 
    const [categories, setCategories] = useState(categoriesList);
    const [types, setTypes] = useState(typesList);
    const [comment, setComment] = useState('');

    const userLogged = '@matheusr.melo';

    useEffect(()=>{
        authorsApi.filter((i,k)=>{
            if(i.name === poemList[currentPoem].creditPage.author){
                setFollowed(i.follow);
            }
        });
        
    }, [currentPoem]);

    const handleActiveCategory = (key) => {
        let newList = [...categories];
        newList[key].active = !newList[key].active;
        setCategories(newList);
    }
    const handleActiveTypes= (key) => {
        let newList = [...types];
        newList[key].active = !newList[key].active;
        setTypes(newList);
    }

    const handleNextPage = ()=>{
        setCurrentPage(prevState => prevState+1);
    }
    const handlePrevPage = ()=>{
        setCurrentPage(prevState=>prevState - 1);
    }
    const handleLikePoem = () => {
        let newList = [...poemList];
        if(newList[currentPoem].liked){
            newList[currentPoem].likes--
        }else{
            newList[currentPoem].likes++
        }
        newList[currentPoem].liked = !newList[currentPoem].liked;
        setPoemList(newList);
    }
    const handleFollow = () =>{
        let newList = [...authorsApi];
        //console.log(newList);
        newList.filter((i, k)=>{
            if(i.name === poemList[currentPoem].creditPage.author){
                newList[k].follow = !i.follow;
            }
        });
        setFollowed(prevState=> !prevState);
        setAuthorsList(newList);
    }

    const handleNextPoem = (i) => {
        setTimeout(()=>{
            setShowCredits(false);
            let newList = [...poemList];
            newList[currentPoem].pageCurrent = 1;
            setPoemList(newList);
            if(i + 1 === poemList.length){
                setCurrentPoem(i);
                console.log("Pegar nova lista");
            }else{
                setCurrentPoem(i);
            }      
        }, 1);
    }
    const handleComment = ()=>{
        if(comment){
            let newList = [...poemList];
            newList[currentPoem].commentsList.push({author:userLogged,comment});
            newList[currentPoem].comments++;
            setPoemList(newList);
            setComment('');
            Keyboard.dismiss();
        }
        
    }
    const handleDeleteComment = (key) => {
        let newList = [...poemList];
        newList[currentPoem].commentsList = newList[currentPoem].commentsList.filter((item, k)=>key!==k);
        newList[currentPoem].comments--;
        setPoemList(newList);
    }
    const onShare = async () => {
        try {
            const result = await Share.share({
            message: `
            
            ${poemList[currentPoem].title}

            ${poemList[currentPoem].body}


            Autor:${poemList[currentPoem].creditPage.author}
            Instagram: ${poemList[currentPoem].creditPage.instagram}
            `,
            });
            if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                let newList = [...poemList];
                newList[currentPoem].share++;
                setPoemList(newList);
            }
            } else if (result.action === Share.dismissedAction) {
            // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return( 
        <Container>
            <Header>
                <FilterButton onPress={()=>setModalVisible(true)}>
                    <FilterIcon width="32" height="32" fill="white" />
                </FilterButton>
                <Logo>SONHADOR</Logo>
                <DirectButton>
                    <DirectIcon width="32" height="32" fill="white" />
                </DirectButton>
            </Header>
            <SwiperArea>
                <Swiper horizontal={false} showsButtons={false} showsPagination={false} onIndexChanged={handleNextPoem}>
                    {
                        books.map((book, index)=>(
                            <BookArea key={index}>
                                <PartBook>
                                    <Heading2 center color="white">{currentPage % 2 === 0 ? book.parts.label : book.title}</Heading2>
                                    <Small color="white">{`${currentPage+1}/${book.parts.pages.length}`}</Small>
                                </PartBook> 
                                <Book>
                                    <BookText type="book">{book.parts.pages[currentPage].book}</BookText>
                                </Book>
                            
                            </BookArea>
                        ))
                    }
                </Swiper>
                <OptionsPage position="left">
                    <OptionItem style={{opacity: currentPage === 0 ? 0:1}} disabled={currentPage===0} onPress={handlePrevPage}>
                        <LeftArrowIcon width="24" height="24" fill='white' />
                    </OptionItem>
                </OptionsPage>
                <OptionsPage position="right">
                    <OptionItem onPress={handleNextPage}>
                        <RightArrowIcon width="24" height="24" fill="white" />
                    </OptionItem>
                    <OptionItem>
                        <ProfileIcon width="24" height="24" fill="white" />
                        {
                            !followed 
                            &&
                            <OptionFollowItem onPress={handleFollow}>
                                <OptionFollowItemText>+</OptionFollowItemText>
                            </OptionFollowItem>
                        }
                    </OptionItem>
                    <OptionItem onPress={handleLikePoem}>
                        {
                            poemList[currentPoem].liked
                            ?
                            <LikeIcon width="24" height="24" fill='white' />
                            :
                            <HeartIcon width="24" height="24" fill='white' />
                        }
                        <OptionNumberItem>{books[currentPoem].numbers.likes}</OptionNumberItem>
                    </OptionItem>
                    <OptionItem onPress={()=>setShowComments(true)}>
                        <MessengerIcon width="24" height="24" fill='white' />
                        <OptionNumberItem>{books[currentPoem].numbers.comments.length}</OptionNumberItem>
                    </OptionItem>
                    <OptionItem onPress={onShare}>
                        <ShareIcon width="24" height="24" fill='white' />
                        <OptionNumberItem>{books[currentPoem].numbers.shared}</OptionNumberItem>
                    </OptionItem>
                </OptionsPage>
            </SwiperArea>
            



            <Modal visible={modalVisible} transparent animationType="fade">
                <ModalContainer>
                    <ListFilter>
                        <ListFilterText>CATEGORIA</ListFilterText>
                        <ListFilterScroll showsHorizontalScrollIndicator={false} horizontal>

                            {
                            categories.map((item, key)=>(
                                <ChooseItemFilter key={key} active={item.active} underlayColor="transparent" onPress={()=>handleActiveCategory(key)}> 
                                    <ChooseItemFilterText active={item.active} >{item.name}</ChooseItemFilterText>
                                </ChooseItemFilter>
                            ))}
                        </ListFilterScroll>
                    </ListFilter>
                    <ListFilter>
                        <ListFilterText>TIPO</ListFilterText>
                        <ListFilterScroll showsHorizontalScrollIndicator={false} horizontal>
                            {
                            typesList.map((item, key)=>(
                                <ChooseItemFilter key={key} active={item.active} underlayColor="transparent" onPress={()=>handleActiveTypes(key)}> 
                                    <ChooseItemFilterText active={item.active} >{item.name}</ChooseItemFilterText>
                                </ChooseItemFilter>
                            ))}
                        </ListFilterScroll>
                    </ListFilter>

                    <CloseModalButton onPress={()=>setModalVisible(false)}>
                        <UpArrowIcon width="32" height="32" fill="white" />
                    </CloseModalButton>
                </ModalContainer>
                <ModalArea onPress={()=>setModalVisible(false)} underlayColor="rgba(0,0,0,0.5)"> 
                    <></>         
                </ModalArea>
            </Modal>
            <Modal visible={showComments} transparent animationType="fade">
                <ModalArea height="30%" onPress={()=>setShowComments(false)} underlayColor="rgba(0,0,0,0.5)"> 
                    <></>         
                </ModalArea>
                <ModalContainer height="70%" bgColor="white">
                    <CloseModalButton marginTop="0px" onPress={()=>setShowComments(false)}>
                        <DownArrowIcon width="32" height="32" fill={colors.primary} />
                    </CloseModalButton>       
                    <ListComments>
                        {
                            poemList[currentPoem].commentsList.length > 0
                            ?
                            <ListFilterScroll showsVerticalScrollIndicator={false}>
                                {poemList[currentPoem].commentsList.map((item, key)=>(
                                    <CommentItem key={key}>
                                        <CommentAreaText>
                                            <CommentAuthor>{item.author}</CommentAuthor>
                                            <Comment>{item.comment}</Comment>
                                        </CommentAreaText>
                                        {
                                            item.author === userLogged 
                                            ?
                                            <CommentDelete onPress={()=>handleDeleteComment(key)}>
                                                <TrashIcon width="32" height="32" fill={colors.primary} />
                                            </CommentDelete> 
                                            :
                                            null
                                        }
                                         
                                    </CommentItem>
                                ))}
                            </ListFilterScroll>
                            :                     
                            <OptionNumberItem>Seja o primeiro a elogiar e/ou aconselhar o nosso escritor</OptionNumberItem>

                        }
                    </ListComments>    
                    <InputArea>
                        <InputComment onSubmitEditing={handleComment} returnKeyType="send" value={comment} onChangeText={comment=>setComment(comment)} placeholder="Deixe sua opinião aqui" />
                        <DirectButton disabled={!comment} onPress={handleComment}>
                            <DirectIcon width="24" height="24" fill={comment?'red':"white"} />
                        </DirectButton>
                    </InputArea>       
                </ModalContainer>           
            </Modal>
        </Container>
    );
}
