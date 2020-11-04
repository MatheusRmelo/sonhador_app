import React, { useState } from 'react';
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
    ButtonFollowText
} from './styles';
import { Modal } from 'react-native';

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
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import TwitterIcon from '../../assets/icons/twitter.svg';


export default () => {
    const [choose, setChoose] = useState('follow');
    const [poem, setPoem] = useState({title: 'Jovem sonhador', 
    body: 
    `
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
     , pages:1, pageCurrent:1,creditPage:{autor:'@matheusr.melo',instagram:'@matheusr.melo',twitter: 'Indisponível'}, likes: 137, share:25, comments: 45});
    const [modalVisible, setModalVisible] = useState(false);
    const [showCredits, setShowCredits] = useState(false);
    const [liked, setLiked]= useState(false);
    const [followed, setFollowed] = useState(false); 
    const [categories, setCategories] = useState(categoriesList);
    const [types, setTypes] = useState(typesList);

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
        let pageNext = {...poem};
        if(poem.pages>1){
           pageNext.pageCurrent++
           setPoem(pageNext);
        }else{
            if(!showCredits){
                pageNext.pageCurrent++
                setPoem(pageNext);
                setShowCredits(true);
            }
        }
    }
    const handlePrevPage = ()=>{
        if(showCredits || poem.pageCurrent>1){
           let pageNext = {...poem};
           pageNext.pageCurrent--
           setPoem(pageNext);
           setShowCredits(false);
        }
    }
    const handleLikePoem = () => {
        let likePoem = {...poem};
        if(liked){
            likePoem.likes--
            setLiked(false);
        }else{
            likePoem.likes++
            setLiked(true);
        }
        setPoem(likePoem);
    }
    const handleFollow = () =>{
        setFollowed(prevState=> !prevState);
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
            {
                showCredits
                ? 
                <Poem>
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
                        <CreditSocial><CreditSocialText>{poem.creditPage.autor}</CreditSocialText></CreditSocial>
                        <ButtonFollow onPress={handleFollow}>
                            <ButtonFollowText>{followed? 'DEIXAR DE SEGUIR': 'SEGUIR'}</ButtonFollowText>
                        </ButtonFollow>
                    </Credits>
                </Poem>
                :
                <Poem>
                    <PoemPages>{poem.pageCurrent<10 ? `0${poem.pageCurrent}`: poem.pageCurrent}/{poem.pages< 10? `0${poem.pages}`: poem.pages}</PoemPages>
                    <PoemTitle>{poem.title}</PoemTitle>
                    <PoemBody>{poem.body}</PoemBody>
                </Poem>
            }
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
                        liked
                        ?
                        <LikeIcon width="32" height="32" fill={colors.secondary} />
                        :
                        <HeartIcon width="32" height="32" fill={colors.secondary} />
                    }
                    <OptionNumberItem>{poem.likes}</OptionNumberItem>
                </OptionItem>
                <OptionItem>
                    <MessengerIcon width="32" height="32" fill={colors.secondary} />
                    <OptionNumberItem>{poem.comments}</OptionNumberItem>
                </OptionItem>
                <OptionItem>
                    <ShareIcon width="32" height="32" fill={colors.secondary} />
                    <OptionNumberItem>{poem.share}</OptionNumberItem>
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
        </Container>
    );
}
