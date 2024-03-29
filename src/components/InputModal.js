import React, { useState, useRef, useEffect } from 'react';
import { 
    Modal,
    Keyboard
} from 'react-native';
import styled from 'styled-components/native';
import { Heading2, Small, colors } from '../commonStyles';

const ModalArea = styled.TouchableOpacity`
    flex:1;
    background-color: rgba(0,0,0,0.5);
    justify-content:center;
    align-items:center;
    padding:16px;
`;
const ModalContainer = styled.TouchableHighlight`
    background-color:white;
    border-radius:16px;
    width:100%;
    height:${props=>props.height? props.height: '30%'};
    padding:16px;
    align-items:center;
`;
const Header = styled.View`
    width:100%;
    margin:8px;
`;
const Input = styled.TextInput`
    margin:8px;
    width:100%;
    height:50px;
    background-color:#EEEEEE;
    border-radius:8px;
    border-width:1px;
    border-color:black;
    font-size:18px;
    padding:8px;
`;
const ActionArea = styled.View`
    flex-direction:row;
    align-self: flex-end;
`;
const ActionItem = styled.TouchableOpacity`
    margin:8px;
`;
export default ({modalVisible, setModalVisible, action,value, setValue, placeholder,titleInput,onAdd, height}) => {
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [title, setTitle] = useState(value);
    const keyboardShowListener = useRef(null);
    const keyboardHideListener = useRef(null);

    useEffect(() => {
        keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
        keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));

        return () => {
            keyboardShowListener.current.remove();
            keyboardHideListener.current.remove();
        }
    });

    useEffect(()=>{
        setTitle(value);
    }, [value]);

  
    const handleActionButton = () => {
        if(action==='rename'){
            setValue(title);
            setTitle('');
        }else
        if(action === 'add'){
            //addUser(title);
            onAdd(title);
            setTitle('');
        }
    }

    return(
        <Modal visible={modalVisible} transparent={true}>
            <ModalArea onPress={()=>setModalVisible(false)}>
                <ModalContainer keyboardOpen={keyboardOpen} height={height} onPress={()=>{}} underlayColor="white"> 
                    <>
                        <Header>
                            <Heading2 center >{titleInput}</Heading2>
                        </Header>
                        <Input placeholder={placeholder} value={title} onChangeText={e=>setTitle(e)} />
                        <ActionArea>
                            <ActionItem onPress={()=>setModalVisible(false)}>
                                <Heading2 color={colors.info}>Cancelar</Heading2>
                            </ActionItem>
                            <ActionItem onPress={handleActionButton}>
                                <Heading2 color={colors.info} >{action==='rename'? 'Renomear':action === 'add'?'Adicionar':''}</Heading2>
                            </ActionItem>
                        </ActionArea>
                        
                    </>
                </ModalContainer>
            </ModalArea>
        </Modal>
    );
}