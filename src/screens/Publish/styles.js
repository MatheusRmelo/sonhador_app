import styled from 'styled-components/native';
import { colors } from '../../commonStyles';
export const Container = styled.SafeAreaView`
    flex:1;
    background-color: ${colors.primary_1};
    padding:32px;
    justify-content:center;
    align-items:center;
`;
export const CheckBoxArea = styled.View`
    width:80%;
    flex-direction:row;
    align-items:center;
`;
