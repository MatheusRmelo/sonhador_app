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
    Comment,
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
    InputComment
} from './styles';
import { Modal } from 'react-native';

import Swiper from 'react-native-swiper';

import { colors } from '../../commonStyles';
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

import { PoemApi, authorsApi } from '../../PoemApi';

export default () => {
    const [choose, setChoose] = useState('follow');
    const [poemList, setPoemList] = useState(PoemApi);
    const [authorsList, setAuthorsList] = useState(authorsApi);
    const [currentPoem, setCurrentPoem] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showCredits, setShowCredits] = useState(false);
    const [liked, setLiked]= useState(false);
    const [followed, setFollowed] = useState(false); 
    const [categories, setCategories] = useState(categoriesList);
    const [types, setTypes] = useState(typesList);

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
        //setShowCredits(false);
        //let pageNext = {...poemList[currentPoem]};
        let newList = [...poemList];
        if(poemList[currentPoem].pages>poemList[currentPoem].pageCurrent){
           newList[currentPoem].pageCurrent++
           setPoemList(newList);
        }else{
            if(!showCredits){
                newList[currentPoem].pageCurrent++
                setPoemList(newList);
                setShowCredits(true);
            }
        }
    }
    const handlePrevPage = ()=>{
        let newList = [...poemList];
        if(showCredits || poemList[currentPoem].pageCurrent>1){
           newList[currentPoem].pageCurrent--
           setPoemList(newList);
           setShowCredits(false);
        }
    }
    const handleLikePoem = () => {
        let newList = [...poemList];
        if(newList[currentPoem].liked){
            newList[currentPoem].likes--
            newList[currentPoem].liked = false;
        }else{
            newList[currentPoem].likes++
            newList[currentPoem].liked = true;
        }
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
            <TabChoose>
                <ChooseItem choose={choose} type="follow" underlayColor="transparent" onPress={()=>setChoose('follow')}> 
                    <ChooseItemText choose={choose} type="general">SEGUINDO</ChooseItemText>
                </ChooseItem>
                <ChooseItem choose={choose} type="general" underlayColor="transparent" onPress={()=>setChoose('general')}>
                    <ChooseItemText choose={choose} type="general">GERAL</ChooseItemText>
                </ChooseItem>
            </TabChoose>
            <Swiper horizontal={false} showsButtons={false} showsPagination={false} onIndexChanged={handleNextPoem} > 
                
                   {
                       poemList.map((poem, index)=>(
                        
                            showCredits
                            ? 
                            <Poem key={index}>
                                <PoemTitle>Créditos</PoemTitle>
                                <Credits>
                                    <CreditSocial>
                                        <CreditSocialText>{poem.creditPage.instagram}</CreditSocialText>
                                        <InstagramIcon width="24" height="24" fill={colors.secondary} />
                                    </CreditSocial>
                                    <CreditSocial>
                                        <CreditSocialText>{poem.creditPage.twitter}</CreditSocialText>
                                        <TwitterIcon width="24" height="24" fill={colors.secondary} />
                                    </CreditSocial>
                                    <CreditSocial><CreditSocialText>{poem.creditPage.author}</CreditSocialText></CreditSocial>
                                    <ButtonFollow onPress={handleFollow}>
                                        <ButtonFollowText>{followed ? 'DEIXAR DE SEGUIR': 'SEGUIR'}</ButtonFollowText>
                                    </ButtonFollow>
                                </Credits>
                            </Poem>
                            :
                            <Poem key={index}>
                                <PoemPages>{poem.pageCurrent<10 ? `0${poem.pageCurrent}`: poem.pageCurrent}/{poem.pages< 10? `0${poem.pages}`: poem.pages}</PoemPages>
                                <PoemTitle>{poem.title}</PoemTitle>
                                <PoemBody>{poem.body}</PoemBody>
                            </Poem>
                       )
                       )
                   }
            </Swiper>
           
            <OptionsPage position="left">
                <OptionItem onPress={handlePrevPage}>
                    <LeftArrowIcon width="32" height="32" fill={colors.secondary} />
                </OptionItem>
            </OptionsPage>
            <OptionsPage position="right">
                <OptionItem onPress={handleNextPage}>
                    <RightArrowIcon width="32" height="32" fill={colors.secondary} />
                </OptionItem>
                <OptionItemFollow>
                    <ProfileIcon width="24" height="24" fill="white" />
                    {
                        !followed 
                        &&
                        <OptionFollowItem onPress={handleFollow}>
                            <OptionFollowItemText>+</OptionFollowItemText>
                        </OptionFollowItem>
                    }
                </OptionItemFollow>
                <OptionItem onPress={handleLikePoem}>
                    {
                        poemList[currentPoem].liked
                        ?
                        <LikeIcon width="32" height="32" fill={colors.secondary} />
                        :
                        <HeartIcon width="32" height="32" fill={colors.secondary} />
                    }
                    <OptionNumberItem>{poemList[currentPoem].likes}</OptionNumberItem>
                </OptionItem>
                <OptionItem onPress={()=>setShowComments(true)}>
                    <MessengerIcon width="32" height="32" fill={colors.secondary} />
                    <OptionNumberItem>{poemList[currentPoem].comments}</OptionNumberItem>
                </OptionItem>
                <OptionItem>
                    <ShareIcon width="32" height="32" fill={colors.secondary} />
                    <OptionNumberItem>{poemList[currentPoem].share}</OptionNumberItem>
                </OptionItem>
            </OptionsPage>
            <NextPage>
                <UpArrowIcon  width="32" height="32" fill="#E3E1E1" />
            </NextPage>
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
                                        <CommentAuthor>{item.author}</CommentAuthor>
                                        <Comment>{item.comment}</Comment>
                                    </CommentItem>
                                ))}
                            </ListFilterScroll>
                            :                     
                            <OptionNumberItem>{poemList[currentPoem].share}</OptionNumberItem>

                        }
                    </ListComments>    
                    <InputArea>
                        <InputComment placeholder="Deixe sua opinião aqui" />
                        <DirectButton>
                            <DirectIcon width="24" height="24" fill="white" />
                        </DirectButton>
                    </InputArea>       
                </ModalContainer>           
            </Modal>
        </Container>
    );
}
