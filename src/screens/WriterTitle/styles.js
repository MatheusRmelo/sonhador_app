import styled from 'styled-components/native';
import { colors } from '../../commonStyles';

export const Container = styled.SafeAreaView`
    flex:1;
    background-color: ${colors.primary_1};
    justify-content:center;
    align-items:center;
    padding:32px;
`;
export const Question = styled.Text`
    font-size:36px;
    color:white;
    text-align:center;
`;
export const InputTitle = styled.TextInput`
    width:100%;
    height:56px;
    background-color:white;
    border-radius:16px;
    padding: 8px 16px;
    margin:16px;
`;
export const Focus = styled.Text`
    color: ${colors.danger};
`;
export const CheckBoxArea = styled.View`
    flex-direction:row;
    justify-content:center;
    align-items:center;
`;
