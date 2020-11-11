import styled from 'styled-components/native';
import { colors } from '../../commonStyles';

export const Container = styled.SafeAreaView`
    flex:1;
    background-color: ${colors.primary_1};
    padding:32px;
`;
export const InputPoem = styled.TextInput`
    flex:1;
    background-color:white;
    border-radius:16px;
    padding: 8px 16px;
    margin:16px 0px;
`;
export const Bold = styled.Text`
    font-weight:bold;
`;
export const OptionsPage = styled.View`
    position:absolute;
    top:35%;
    right: ${props=>props.position === 'right'? 0:'auto'};
    left: ${props=>props.position === 'left'? 0:'auto'};
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
export const PartPoem = styled.View`
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`;
export const ButtonDelPage = styled.TouchableOpacity``;
