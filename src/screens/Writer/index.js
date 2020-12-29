import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCategory } from '../../CategorySVG';
import { useDispatch, useSelector } from 'react-redux';

import {
    Container,
    PoemList,
    PoemArea,
    OptionBook,
    OptionItem,
    OptionTextArea,
    ButtonAddPoem,
    FilterArea,
    LoadingArea,
    ModalArea,
    ModalContainer,
    GroupAction,
    GroupArea,
    ButtonPublish,
    WriterArea,
    ButtonWriter
} from './styles';
import SearchHeader from '../../components/SearchHeader';
import Tabs from '../../components/Tabs';
import PoemItem from '../../components/PoemItem';
import InputModal from '../../components/InputModal';
import { Heading1, Heading2, Small, colors } from '../../commonStyles';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Modal, Share, Keyboard, ActivityIndicator } from 'react-native';

import UpArrowIcon from '../../assets/icons/up-arrow.svg';
import DownArrowIcon from '../../assets/icons/down-arrow.svg';
import TrashIcon from '../../assets/icons/trash.svg';
import EditIcon from '../../assets/icons/edit.svg';
import ShareIcon from '../../assets/icons/share.svg';
import DownloadIcon from '../../assets/icons/download.svg';
import AddUserIcon from '../../assets/icons/add-user.svg';
import AddIcon from '../../assets/icons/plus.svg';
import NewIcon from '../../assets/icons/new.svg';
import WriterIcon from '../../assets/writer_now.svg';
import BookIcon from '../../assets/categories/book.svg';
import PoemIcon from '../../assets/categories/poem.svg';
import CordelIcon from '../../assets/categories/cordel.svg';

import Api from '../../Api';





export default () => {
    const [tabs, setTabs] = useState([{name:'RASCUNHOS', active: true},{name:'PUBLICADAS', active: false}]);
    const [filters, setFilters] = useState([
        {filter: 'últimos visualizados por mim', order:'desc',},
        {filter: 'últimos alterados por mim', order:'desc'},
        {filter: 'últimos criados por mim', order:'desc'},
        {filter: 'nome', order:'desc'}
    ]);
    const [listTexts, setListTexts] = useState([]);

    const [currentFilter, setCurrentFilter] = useState(0);
    const [currentText, setCurrentText] = useState(0);

    const [actionVisible, setActionVisible] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [options, setOptions] = useState(false);
    const [action, setAction] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [loading, setLoading] = useState(false);

    const userId = useSelector(state=>state.user.uid);
    const userName = useSelector(state=>state.user.name);
    const texts = useSelector(state=>state.book.myBooks);

    const navigation = useNavigation();
    const category = useCategory();
    const dispatch = useDispatch();

    const onShare = async () => {
        try {
            const result = await Share.share({
            message: 
            `
                ${listTexts[currentText].text.title}

                ${listTexts[currentText].text.pages.map((item)=>(
                `
                    ${item.page}/${listTexts[currentText].text.pages.length}

                    ${item.poem}
                `
            ))}
                Autor: TODO
                Instagram: Não disponível
            `.trim(),
            });
            if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {

            }
            } else if (result.action === Share.dismissedAction) {
            // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const _keyboardDidShow = () => {
        setKeyboardVisible(true);
    };
    const _keyboardDidHide = () => { 
        setKeyboardVisible(false);
    };
    const handleActiveTab = (key) => {
        let newList = [...tabs];
        let newTexts = [];
        for(let i in newList){
            if(i==key){
                newList[i].active = true;
            }else{
                newList[i].active = false;
            }
        }
        setTabs(newList);
        newList.forEach((item)=>{
            if(item.active){
                if(item.name === 'PUBLICADAS'){
                    texts.forEach((item)=>{
                        if(item.text.published){
                            newTexts.push(item);
                        }
                    });
                }else{
                    texts.forEach((item)=>{
                        if(!item.text.published){
                            newTexts.push(item);
                        }

                    });
                }
            }
        });
        setListTexts(newTexts);
    }
    const handleActionVisible = (key) => {
        setCurrentText(key);
        setActionVisible(true);
    }
    const handleNewTitle = async (title) => {
        setLoading(true);
        const updated = await Api.updateBook(texts[currentText].id, {title});
        if(updated){
            getMyBooks();
            setInputVisible(false);
            setActionVisible(false);
        }else{
            alert("Falha na edição!");
        }
        setLoading(false);
    }
    const handleActionOption = (act) => {
        setAction(act);
        setInputVisible(true);
    }
    const handleDeleteText = async () => {
        let bookId = texts[currentText].id;
        if(currentText>0){
            setCurrentText(prevState=>prevState-1);
        }
        
        setLoading(true);
        let deleted = await Api.deleteBook(bookId);
        if(deleted){
            getMyBooks();
            setShowDelete(false);
            setActionVisible(false);
        }else{
            alert("Falha na exclusão!");
        }
        setLoading(false);
    }
    const handleChangeFilter = (key) => {
        setCurrentFilter(key);
        setFilterVisible(false);
    }
    const handleGoWriter = (type) => {
        setOptions(false);
        navigation.navigate('WriterTitle', {type});
    }
    const getMyBooks = async () => {
        setLoading(true);
        let result = await Api.getMyTexts(userId);
        dispatch({
            type: 'SET_MYBOOKS',
            payload:{
                texts:result
            }
        });
        setLoading(false);
    }


    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    
        // cleanup function
        return () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);
    useEffect(()=>{
        handleActiveTab(0);
    }, [texts]);
    useEffect(()=>{
        getMyBooks();
    }, []);

    return( 
        <Container>
            <Modal visible={loading} transparent={true}>
                <LoadingArea>
                    <ActivityIndicator size="large" color={colors.primary} />
                </LoadingArea>
            </Modal>
            <Modal visible={options} transparent={true} animationType="slide" >
                <ModalArea onPress={()=>setOptions(false)}>
                    <OptionBook onPress={()=>{}} underlayColor="white">
                        <>
                            <OptionItem onPress={()=>handleGoWriter('book')}>
                                <BookIcon width="24" height="24" fill="black" />
                                <OptionTextArea>
                                    <Small>Livro</Small>
                                </OptionTextArea>
                            </OptionItem>
                            <OptionItem onPress={()=>handleGoWriter('poem')}>
                                <PoemIcon width="24" height="24" fill="black" />
                                <OptionTextArea>
                                    <Small>Poema</Small>
                                </OptionTextArea>
                            </OptionItem>
                            <OptionItem onPress={()=>handleGoWriter('cordel')}>
                                <CordelIcon width="24" height="24" fill="black" />
                                <OptionTextArea>
                                    <Small>Cordel</Small>
                                </OptionTextArea>
                            </OptionItem>
                        </>
                    </OptionBook>
                </ModalArea>
            </Modal>
            <Modal visible={actionVisible} transparent={true} animationType="fade">
                <ModalArea onPress={()=>setActionVisible(false)}>
                    <ModalContainer onPress={()=>{}} underlayColor="white">
                        <>
                            <GroupAction header>
                                <GroupArea>
                                    {category.getCategory(listTexts[currentText]?listTexts[currentText].text.category:'', '24', '24','white')}
                                    <Heading2 margin="16px" color="white">{listTexts[currentText] ? listTexts[currentText].text.title:''}</Heading2>
                                </GroupArea>
                            </GroupAction>
                            <GroupAction>
                                {
                                    listTexts[currentText] && listTexts[currentText].text.published &&
                                    <GroupArea>
                                        <NewIcon width="24" height="24" fill="black" />
                                        <Heading2 margin="16px" color="black">Criar continuação da história</Heading2>
                                    </GroupArea>
                                }
                                
                                <GroupArea onPress={onShare}>
                                    <ShareIcon width="12" height="12" fill="black" />
                                    <Heading2 margin="16px" color="black">Compartilhar</Heading2>
                                </GroupArea>
                            </GroupAction>
                            <GroupAction>
                                <GroupArea onPress={()=>handleActionOption("rename")}>
                                    <EditIcon width="12" height="12" fill="black" />
                                    <Heading2 margin="16px" color="black">Renomear</Heading2>
                                </GroupArea>
                                <GroupArea onPress={()=>setShowDelete(true)}>
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
            <AwesomeAlert
                show={showDelete}
                showProgress={true}
                title="Excluir a obra"
                message="Deseja realmente excluir essa obra?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                onDismiss={() => {
                    setShowDelete(false);
                }}
                cancelText="Cancelar"
                confirmText="EXCLUIR"
                confirmButtonColor={colors.danger}
                onCancelPressed={() => {
                    setShowDelete(false);
                }}
                onConfirmPressed={handleDeleteText}
            />
            <InputModal 
                modalVisible={inputVisible} 
                setModalVisible={value=>setInputVisible(value)} 
                value={listTexts[currentText]?listTexts[currentText].text.title:''} 
                setValue={title=>handleNewTitle(title)} 
                titleInput={'Renomear obra'}
                action={action} 
                placeholder=''
                height={keyboardVisible ? '45%' : '30%'}
            />
            <Modal transparent={true} visible={filterVisible} animationType="fade">
                <ModalArea onPress={()=>setFilterVisible(false)}>
                    <ModalContainer height="45%">
                        <>
                            <GroupAction>
                                <GroupArea>
                                    <Heading2 bold margin="16px" color="black">Classificar por</Heading2>
                                </GroupArea>
                            </GroupAction>
                            <GroupAction color="white">
                                {filters.map((item,key)=>(
                                        <GroupArea key={key} active={currentFilter === key} onPress={()=>handleChangeFilter(key)}>
                                            <DownArrowIcon width="12" height="12" fill="white" />
                                            <Heading2 margin="16px" color={currentFilter === key ? 'white':'black'}>{item.filter}</Heading2>
                                        </GroupArea>
                                ))}
                            </GroupAction>
                        </>
                    </ModalContainer>
                </ModalArea>
            </Modal>




            <SearchHeader onPress={()=>navigation.navigate('SearchComponent')} placeholder="Pesquisar suas obras...">
                <Tabs tabs={tabs} setActive={(key)=>handleActiveTab(key)} />
            </SearchHeader>
            {
                listTexts.length < -4 &&
                <FilterArea onPress={()=>setFilterVisible(true)}>
                    <Heading2 margin="8px" color="black">{filters[currentFilter].filter}</Heading2>
                    {filters[currentFilter].order ==='asc'?
                        <UpArrowIcon width="12" height="12" fill="black" />:
                        <DownArrowIcon width="12" height="12" fill="black" />
                    }
                </FilterArea>
            }
            {
                listTexts.length > 0 &&
                <PoemList showsVerticalScrollIndicator={false}>
                    <PoemArea>
                        {listTexts.map((item, key)=>(
                            <PoemItem key={key} poem={item.text} bookId={item.id} setActionVisible={()=>handleActionVisible(key)} />
                        ))}
                    </PoemArea>
                </PoemList>
            }
            {
                listTexts.length === 0 &&
                <WriterArea>
                    <Heading2 color="black">Escreva agora uma nova história</Heading2>
                    <WriterIcon width="100%" height="50%" fill='white'/>
                    <ButtonWriter onPress={()=>setOptions(true)}>
                        <AddIcon width="24" height="24" fill="white" />
                    </ButtonWriter>
                </WriterArea>
            }
            
            {
                listTexts.length > 0 &&
                <ButtonAddPoem onPress={()=>setOptions(true)}>
                    <AddIcon width="16" height="16" fill="white" />
                </ButtonAddPoem>
            }
        </Container>
    );
}
