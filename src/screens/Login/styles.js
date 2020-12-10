import styled from 'styled-components/native';
import { colors } from '../../commonStyles';

export const Container = styled.SafeAreaView`
    padding:32px;
    justify-content: space-between;
    background-color: ${colors.secondary};
    flex:1;
`;
export const Header = styled.View``;
export const LoginGmail = styled.TouchableOpacity`
    flex-direction:row;
    align-items:center;
    width:100%;
    height:48px;
    border-radius:32px;
    color:white;
    background-color:white;
    padding:16px;
    
`;
export const LoginGmailText = styled.Text`
    color:black;
    font-size:18px;
    margin:0px 32px;
`;
export const Logo = styled.Text`
    font-size:40px;
    color:${colors.primary};
    font-family: 'Fredoka One';
`;
export const Message = styled.Text`
    font-size:48px;
    color:white;
    font-family: 'Fredoka One';
`;