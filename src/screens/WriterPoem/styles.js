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
