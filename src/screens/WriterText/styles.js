import styled from 'styled-components/native';
import { colors } from '../../commonStyles';

export const Container = styled.SafeAreaView`
    flex:1;
    background-color: ${colors.primary_1};
    padding:32px;
`;
export const InputText = styled.TextInput`
    flex:1;
    background-color:white;
    border-radius:16px;
    padding: 16px;
    margin:16px 0px;
    font-size:16px;
    font-family: 'EBGaramond';
    line-height: 24px;
`;
export const Bold = styled.Text`
    font-weight:bold;
`;
export const OptionsPage = styled.View`
    position:absolute;
    top:35%;
    right: ${props=>props.position === 'right'? '-8px':'auto'};
    left: ${props=>props.position === 'left'? '-8px':'auto'};
`;
export const ButtonAddPage = styled.TouchableOpacity`
    margin: 12px 16px;
    width:40px;
    height:40px;
    background-color: ${colors.secondary};
    border-radius: 25px;
    justify-content: center;
    align-items: center;
`;
export const ButtonAddPageItem = styled.View`
    position: absolute;
    bottom:0;
    right: 0;
    background-color: ${colors.contrast};
    width: 18px;
    height:18px;
    border-radius:9px;
    justify-content: center;
    align-items: center;
`;
export const ButtonAddPageItemText = styled.Text`
    font-size:8px;
`;
export const PartTextArea = styled.View`
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`;
export const ButtonsOptions = styled.View`
    flex-direction:row;
`;
export const ButtonOptionPart = styled.TouchableOpacity`
    margin:0 8px;
`;

export const ModalArea = styled.View`
    flex:1;
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
    align-items:center;
`;
export const ButtonCloseModal = styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    margin:16px;
`;
export const ModalContainer = styled.View`
    background-color:white;
    border-radius:16px;
    height:50%;
    width:80%;
    justify-content:center;
    align-items:center;
    padding:64px 0px;
`;
export const ModalInput = styled.TextInput`
    width:70%;
    height:40px;
    background-color:${colors.gray_1};
    border-radius:16px;
    padding: 8px 16px;
    margin:16px;
`;
export const ButtonClose = styled.TouchableOpacity`
    position:absolute;
    top:16px;
    right:16px;
    background-color:${colors.primary};
    width:40px;
    height:40px;
    border-radius:20px;
    justify-content:center;
    align-items:center;
`;
export const ButtonCloseText = styled.Text`
    color:white;
    font-size:12px;
`;


export const OptionBook = styled.TouchableHighlight`
    position:absolute;
    bottom:20%;
    right:80px;
    background-color:white;
    width:50%;
    height:20%;
    border-radius:16px;
    padding:8px;
`;
export const OptionItem  = styled.TouchableOpacity`
    flex-direction:row;
    padding:0px 8px;
    margin:16px 0px;
`;
export const OptionTextArea = styled.View`
    flex:1;
    border-bottom-width:1px;
    border-bottom-color: #CCC;
    padding:0 8px;
    margin:0 8px;
`;
export const Photo = styled.Image`
    flex:1;
    background-color:white;
    border-radius:16px;
    padding: 16px;
    margin:16px 0px;
`;
export const ImageArea = styled.TouchableOpacity`
    flex:1;
    background-color: rgba(0,0,0,0.5);
    justify-content:flex-end;
`;

