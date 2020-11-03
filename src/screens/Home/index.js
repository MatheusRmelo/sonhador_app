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
    OptionsPageRight,
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
    ListFilterNormal,
    ChooseItemFilter,
    ChooseItemFilterText
} from './styles';
import { Modal } from 'react-native';

import { colors } from '../../commonStyles';
import { categories } from '../../categories';
import FilterIcon from '../../assets/icons/filter.svg';
import DirectIcon from '../../assets/icons/direct.svg';
import RightArrowIcon from '../../assets/icons/right-arrow.svg';
import ProfileIcon from '../../assets/icons/profile.svg';
import HeartIcon from '../../assets/icons/heart.svg';
import MessengerIcon from '../../assets/icons/messenger.svg';
import ShareIcon from '../../assets/icons/share.svg';
import UpArrowIcon from '../../assets/icons/up-arrow.svg';


export default () => {
    const [choose, setChoose] = useState('follow');
    const [poem, setPoem] = useState({title: 'Jovem sonhador', 
    body: 
    `Como posso não sonhar?
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
     , pages: '02', pageCurrent:'01', likes: 137, share:25, comments: 45});
    const [modalVisible, setModalVisible] = useState(false);

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
            <Poem>
                <PoemPages>{poem.pageCurrent}/{poem.pages}</PoemPages>
                <PoemTitle>{poem.title}</PoemTitle>
                <PoemBody>{poem.body}</PoemBody>
            </Poem>
            <OptionsPageRight>
                <OptionItem>
                    <RightArrowIcon width="32" height="32" fill={colors.secondary} />
                </OptionItem>
                <OptionItemFollow>
                    <ProfileIcon width="24" height="24" fill="white" />
                    <OptionFollowItem>
                        <OptionFollowItemText>+</OptionFollowItemText>
                    </OptionFollowItem>
                </OptionItemFollow>
                <OptionItem>
                    <HeartIcon width="32" height="32" fill={colors.secondary} />
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
            </OptionsPageRight>
            <NextPage>
                <UpArrowIcon  width="32" height="32" fill="#E3E1E1" />
            </NextPage>
            <Modal visible={modalVisible} transparent>
                <ModalArea>
                    <ModalContainer>
                        <ListFilter>
                            <ListFilterText>CATEGORIA</ListFilterText>
                            <ListFilterScroll showsHorizontalScrollIndicator={false} horizontal>
                                {categories.map((item, key)=>(
                                    <ChooseItemFilter key={key} choose={choose} type="follow" underlayColor="transparent" onPress={()=>setChoose('follow')}> 
                                        <ChooseItemFilterText choose={choose} type="general">{item.name}</ChooseItemFilterText>
                                    </ChooseItemFilter>
                                ))}
                            </ListFilterScroll>
                        </ListFilter>
                        <ListFilter>
                            <ListFilterText>TIPO</ListFilterText>
                            <ListFilterNormal>
                                <ChooseItemFilter choose={choose} type="follow" underlayColor="transparent" onPress={()=>setChoose('follow')}> 
                                    <ChooseItemFilterText choose={choose} type="general">POEMA</ChooseItemFilterText>
                                </ChooseItemFilter>
                                <ChooseItemFilter choose={choose} type="follow" underlayColor="transparent" onPress={()=>setChoose('follow')}> 
                                    <ChooseItemFilterText choose={choose} type="general">CORDEL</ChooseItemFilterText>
                                </ChooseItemFilter>
                            </ListFilterNormal>
                        </ListFilter>
                    </ModalContainer>
                </ModalArea>
            </Modal>
        </Container>
    );
}
