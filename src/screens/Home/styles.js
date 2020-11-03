import styled from 'styled-components/native';
import { colors } from '../../commonStyles';
const theme = 'LIGHT';
export const Container = styled.SafeAreaView`
    flex:1;
    background-color: ${theme ? 'white' : 'black'};
`;
export const Header = styled.View`
    background-color: ${colors.primary};
    justify-content: space-between;
    flex-direction: row;
    padding: 16px;
`;
export const FilterButton = styled.TouchableOpacity``;
export const Logo = styled.Text`
    font-size:18px;
    color: white;

`;
export const DirectButton = styled.TouchableOpacity``;