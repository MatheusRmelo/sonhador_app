import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import useIcons from '../../utils/Icons';
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
import { Heading1, Heading2, Small, colors, styles } from '../../commonStyles';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Modal, Share, Keyboard, ActivityIndicator } from 'react-native';

import WriterIcon from '../../assets/writer_now.svg';


import Api from '../../Api';


export default () => {
    const [tabs, setTabs] = useState([{name:'RASCUNHOS', active: true},{name:'PUBLICADAS', active: false}]);
    const [listTexts, setListTexts] = useState([]);

    const [action, setAction] = useState('');
    const [currentText, setCurrentText] = useState(0);

    const [showAction, setShowActive] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [options, setOptions] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [loading, setLoading] = useState(false);

    const userId = useSelector(state=>state.user.uid);
    const userName = useSelector(state=>state.user.name);
    const texts = useSelector(state=>state.book.myBooks);

    const navigation = useNavigation();
    const icons = useIcons();
    const dispatch = useDispatch();

    const _keyboardDidShow = () => {
        setShowKeyboard(true);
    };
    const _keyboardDidHide = () => { 
        setShowKeyboard(false);
    };

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

    const changeActivePage = async (key) => {
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
    const actionVisible = (key) => {
        setCurrentText(key);
        setShowActive(true);
    }
    const updateTitle = async (title) => {
        setLoading(true);
        const updated = await Api.updateBook(texts[currentText].id, {title});
        if(updated){
            getMyBooks();
            setShowInput(false);
            setShowActive(false);
        }else{
            alert("Falha na edição!");
        }
        setLoading(false);
    }
    const changeAction = (act) => {
        setAction(act);
        setShowInput(true);
    }
    const deleteText = async () => {
        let bookId = texts[currentText].id;
        if(currentText>0){
            setCurrentText(prevState=>prevState-1);
        }
        
        setLoading(true);
        let deleted = await Api.deleteBook(bookId);
        if(deleted){
            getMyBooks();
            setShowDelete(false);
            setShowActive(false);
        }else{
            alert("Falha na exclusão!");
        }
        setLoading(false);
    }
    const onWriterText = (type) => {
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
        getMyBooks();
    }, []);
    useEffect(()=>{
        if(texts){
            changeActivePage(0);
        }
    }, [texts]);
    

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
                            <OptionItem onPress={()=>onWriterText('book')}>
                                {icons.getIcons('book', 24,24,'black')}
                                <OptionTextArea>
                                    <Small>Livro</Small>
                                </OptionTextArea>
                            </OptionItem>
                            <OptionItem onPress={()=>onWriterText('poem')}>
                                {icons.getIcons('poem', 24,24,'black')}
                                <OptionTextArea>
                                    <Small>Poema</Small>
                                </OptionTextArea>
                            </OptionItem>
                            <OptionItem onPress={()=>onWriterText('cordel')}>
                                {icons.getIcons('cordel', 24,24,'black')}
                                <OptionTextArea>
                                    <Small>Cordel</Small>
                                </OptionTextArea>
                            </OptionItem>
                        </>
                    </OptionBook>
                </ModalArea>
            </Modal>
            <Modal visible={showAction} transparent={true} animationType="fade">
                <ModalArea onPress={()=>setShowActive(false)}>
                    <ModalContainer onPress={()=>{}} underlayColor="white">
                        <>
                            <GroupAction header>
                                <GroupArea>
                                    {icons.getIcons(listTexts[currentText]?listTexts[currentText].text.category:'', '24', '24','white')}
                                    <Heading2 margin="16px" color="white">{listTexts[currentText] ? listTexts[currentText].text.title:''}</Heading2>
                                </GroupArea>
                            </GroupAction>
                            <GroupAction>
                                {
                                    listTexts[currentText] && listTexts[currentText].text.published &&
                                    <GroupArea>
                                        {icons.getIcons('new', 24,24,'black')}
                                        <Heading2 margin="16px" color="black">Criar continuação da história</Heading2>
                                    </GroupArea>
                                }
                                
                                <GroupArea onPress={onShare}>
                                    {icons.getIcons('share', 18,18,'black')}
                                    <Heading2 margin="16px" color="black">Compartilhar</Heading2>
                                </GroupArea>
                            </GroupAction>
                            <GroupAction>
                                <GroupArea onPress={()=>changeAction("rename")}>
                                    {icons.getIcons('edit', 18,18,'black')}
                                    <Heading2 margin="16px" color="black">Renomear</Heading2>
                                </GroupArea>
                                <GroupArea onPress={()=>setShowDelete(true)}>
                                    {icons.getIcons('trash', 18,18,'black')}
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
                titleStyle={styles.heading3}
                message="Deseja realmente excluir essa obra?"
                messageStyle={styles.small}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={true}
                showConfirmButton={true}
                onDismiss={() => {
                    setShowDelete(false);
                }}
                cancelText="Cancelar"
                cancelButtonTextStyle={styles.small_light}
                confirmText="EXCLUIR"
                confirmButtonTextStyle={styles.small_light}
                confirmButtonColor={colors.danger}
                onCancelPressed={() => {
                    setShowDelete(false);
                }}
                onConfirmPressed={deleteText}
            />
            <InputModal 
                modalVisible={showInput} 
                setModalVisible={value=>setShowInput(value)} 
                value={listTexts[currentText]?listTexts[currentText].text.title:''} 
                setValue={title=>updateTitle(title)} 
                titleInput='Renomear obra'
                action={action} 
                placeholder=''
                height={showKeyboard ? '45%' : '30%'}
            />


            <SearchHeader onPress={()=>navigation.navigate('SearchComponent')} placeholder="Pesquisar suas obras...">
                <Tabs tabs={tabs} setActive={(key)=>changeActivePage(key)} />
            </SearchHeader>
            {
                listTexts.length > 0 ?
                <>
                    <PoemList showsVerticalScrollIndicator={false}>
                        <PoemArea>
                            {listTexts.map((item, key)=>(
                                <PoemItem key={key} poem={item.text} bookId={item.id} setActionVisible={()=>actionVisible(key)} />
                            ))}
                        </PoemArea>
                    </PoemList>
                    <ButtonAddPoem onPress={()=>setOptions(true)}>
                        {icons.getIcons('add', 16,16,'white')}
                    </ButtonAddPoem>
                </>
                :
                <WriterArea>
                    <Heading2 color="black">Escreva agora uma nova história</Heading2>
                    <WriterIcon width="100%" height="50%" fill='white'/>
                    <ButtonWriter onPress={()=>setOptions(true)}>
                        {icons.getIcons('add', 24,24,'white')}
                    </ButtonWriter>
                </WriterArea>
            }
            
        </Container>
    );
}
