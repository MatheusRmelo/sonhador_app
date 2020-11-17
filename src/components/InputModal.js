import React, { useState, useRef, useEffect } from 'react';
import { 
    Modal,
    Keyboard
} from 'react-native';
import styled from 'styled-components/native';
import { Heading2, Small } from '../commonStyles';

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
    height:${props=>props.keyboardOpen? '50%': '30%'};
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
    background-color:#ccc;
    border-radius:8px;
    border-width:1px;
    border-color:black;
    font-size:18px;
`;
const ActionArea = styled.View`
    flex-direction:row;
    align-self: flex-end;
`;
const ActionItem = styled.TouchableOpacity`
    margin:8px;
`;
export default ({modalVisible, setModalVisible, action,value,oldValue, setValue, placeholder, Delete}) => {
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [title, setTitle] = useState(value);
    const [disabled, setDisabled] = useState(true);
    const oldText = useRef(oldValue);
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
        oldText.current = oldValue;
    }, [oldValue]);
    useEffect(()=>{
        
        setTitle(value);
    }, [value]);

    const handleChangeText = (e) => {
        if(e === oldText.current){
            setDisabled(false);
        }else{
            setDisabled(true);
        }
        setTitle(e);

    }

    const handleActionButton = () => {
        if(action==='rename'){
            setValue(title);
            setTitle('');
        }else{
            Delete();
            setTitle('');
        }
    }

    return(
        <Modal visible={modalVisible} transparent={true}>
            <ModalArea onPress={()=>setModalVisible(false)}>
                <ModalContainer keyboardOpen={keyboardOpen} onPress={()=>{}} underlayColor="white"> 
                    <>
                        <Header>
                            <Heading2 center >{action==='rename' ? 'Renomear a obra': `Deletar a obra (${oldText.current})`}</Heading2>
                        </Header>
                        <Input placeholder={placeholder} value={title} onChangeText={e=>handleChangeText(e)} />
                        <ActionArea>
                            <ActionItem onPress={()=>setModalVisible(false)}>
                                <Heading2 color="blue">Cancelar</Heading2>
                            </ActionItem>
                            <ActionItem onPress={handleActionButton} disabled={action==='delete'?disabled:false}>
                                <Heading2 color={action==='rename'?"blue":disabled ? 'gray':'blue'}>{action==='rename' ? 'Renomear':'Excluir'}</Heading2>
                            </ActionItem>
                        </ActionArea>
                        {
                            action==='delete' && disabled &&
                            <Small color="#CCC">Digite o título da obra para excluir</Small>
                        }
                        
                    </>
                </ModalContainer>
            </ModalArea>
        </Modal>
    );
}