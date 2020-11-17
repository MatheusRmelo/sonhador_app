import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCategory } from '../../CategorySVG';

import {
    Container,
    PoemList,
    CategoryPhoto,
    PoemInfo,
    PoemArea,
    ButtonAddPoem,
    ButtonAddPoemText,
    FilterArea,
    ModalArea,
    ModalContainer,
    GroupAction,
    GroupArea,
    ButtonPublish
} from './styles';
import SearchHeader from '../../components/SearchHeader';
import Tabs from '../../components/Tabs';
import PoemItem from '../../components/PoemItem';

import { Heading2, Small } from '../../commonStyles';

import { PoemApi } from '../../PoemApi';

import UpArrowIcon from '../../assets/icons/up-arrow.svg';
import DownArrowIcon from '../../assets/icons/down-arrow.svg';
import TrashIcon from '../../assets/icons/trash.svg';
import EditIcon from '../../assets/icons/edit.svg';
import ShareIcon from '../../assets/icons/share.svg';
import DownloadIcon from '../../assets/icons/download.svg';
import AddUserIcon from '../../assets/icons/add-user.svg';


import { Modal } from 'react-native';
import InputModal from '../../components/InputModal';


export default () => {
    const [tabs, setTabs] = useState([{name:'RASCUNHOS', active: true},{name:'PUBLICADAS', active: false}]);
    const [poem, setPoem] = useState(PoemApi);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([
        {filter: 'últimos visualizados por mim', order:'desc'}
    ]);
    const [currentFilter, setCurrentFilter] = useState(0);
    const [currentPoem, setCurrentPoem] = useState(0);
    const [actionVisible, setActionVisible] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const [action, setAction] = useState('');

    const navigation = useNavigation();
    const category = useCategory();

    const handleActiveTab = (key) => {
        let newList = [...tabs];
        for(let i in newList){
            if(i==key){
                newList[i].active = true;
            }else{
                newList[i].active = false;
            }
        }
        
        setTabs(newList);
    }
    const handleSearch = (t) => {
        setSearch(t);
        if(t===''){
            setPoem(PoemApi);
            return;
        }
        let newList = PoemApi.filter((item,key)=>(item.title===t));
        setPoem(newList);
    }
    const handleActionVisible = (key) => {
        setCurrentPoem(key);
        setActionVisible(true);
    }
    const handleNewTitle = (title) => {
        let newList = [...poem];
        newList[currentPoem].title = title;
        setPoem(newList);
        setInputVisible(false);
        setActionVisible(false);
    }

    const handleActionOption = (act) => {
        setAction(act);
        setInputVisible(true);
    }
    const handleDeletePoem = () => {
        let newList = [...poem];
        newList = newList.filter((i,k)=>k!==currentPoem);
        if(currentPoem>0)
            setCurrentPoem(prevState=>prevState-1);
        setPoem(newList);
        setInputVisible(false);
        setActionVisible(false);
    }


    return( 
        <Container>
            <SearchHeader input search={search} setSearch={(t)=>handleSearch(t)} placeholder="Pesquisar suas obras...">
                <Tabs tabs={tabs} setActive={(key)=>handleActiveTab(key)} />
            </SearchHeader>
            <FilterArea>
                <Heading2 margin="8px" color="black">{filters[currentFilter].filter}</Heading2>
                {filters[currentFilter].order ==='asc'?
                    <UpArrowIcon width="12" height="12" fill="black" />:
                    <DownArrowIcon width="12" height="12" fill="black" />
                }
            </FilterArea>
            {
                poem.length > 0 &&
                <PoemList showsVerticalScrollIndicator={false}>
                    <PoemArea>
                        {poem.map((item, key)=>(
                            <PoemItem key={key} poem={item} setActionVisible={()=>handleActionVisible(key)} />
                        ))}
                    </PoemArea>
                </PoemList>
            }
            <ButtonAddPoem onPress={()=>navigation.navigate('WriterTitle')}>
                <ButtonAddPoemText>+</ButtonAddPoemText>
            </ButtonAddPoem>

            <Modal visible={actionVisible} transparent={true} animationType="fade">
                <ModalArea onPress={()=>setActionVisible(false)}>
                    <ModalContainer onPress={()=>{}} underlayColor="white">
                        <>
                            <GroupAction>
                                <GroupArea>
                                    {category.getCategory(poem[currentPoem].category, '12', '12','black')}
                                    <Heading2 bold margin="16px" color="black">{poem[currentPoem].title}</Heading2>
                                </GroupArea>
                            </GroupAction>
                            <GroupAction>
                                <GroupArea>
                                    <DownloadIcon width="12" height="12" fill="black" />
                                    <Heading2 margin="16px" color="black">Tornar disponível off-line</Heading2>
                                </GroupArea>
                                <GroupArea>
                                    <ShareIcon width="12" height="12" fill="black" />
                                    <Heading2 margin="16px" color="black">Compartilhar</Heading2>
                                </GroupArea>
                                <GroupArea>
                                    <AddUserIcon width="12" height="12" fill="black" />
                                    <Heading2 margin="16px" color="black">Convidar alguém</Heading2>
                                </GroupArea>
                            </GroupAction>
                            <GroupAction>
                                <GroupArea onPress={()=>handleActionOption("rename")}>
                                    <EditIcon width="12" height="12" fill="black" />
                                    <Heading2 margin="16px" color="black">Renomear</Heading2>
                                </GroupArea>
                                <GroupArea onPress={()=>handleActionOption("delete")}>
                                    <TrashIcon width="12" height="12" fill="black" />
                                    <Heading2 margin="16px" color="black">Excluir</Heading2>
                                </GroupArea>
                            </GroupAction>
                            <ButtonPublish>
                                <Heading2 color="white">PUBLICAR</Heading2>
                            </ButtonPublish>
                        </>
                    </ModalContainer>
                </ModalArea>
            </Modal>
            <InputModal modalVisible={inputVisible} setModalVisible={value=>setInputVisible(value)} oldValue={poem[currentPoem].title} placeholder={action==='delete'? `Digite o título para excluir`:''} value={action === 'delete' ? '' : poem[currentPoem].title} setValue={title=>handleNewTitle(title)} action={action} Delete={handleDeletePoem} />
        </Container>
    );
}
